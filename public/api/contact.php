<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

// CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://casualbrothers.com','https://www.casualbrothers.com','http://localhost','http://localhost:3000'];
if (in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Parse JSON or form-encoded
$ct = $_SERVER['CONTENT_TYPE'] ?? '';
if (str_contains($ct, 'application/json')) {
    $data = json_decode(file_get_contents('php://input'), true) ?? [];
} else {
    $data = $_POST;
}

$name    = trim((string) ($data['name'] ?? ''));
$email   = trim((string) ($data['email'] ?? ''));
$subject = trim((string) ($data['subject'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$type    = trim((string) ($data['type'] ?? 'GENERAL'));  // GENERAL or BUSINESS
$website = trim((string) ($data['website'] ?? ''));

// Honeypot
if ($website !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please fill in name, email, and message.']);
    exit;
}

// Sanitise type
$typeUpper = strtoupper($type);
if (!in_array($typeUpper, ['GENERAL', 'BUSINESS'], true)) {
    $typeUpper = 'GENERAL';
}

$to = 'contact@casualbrothers.com';
$safeName = str_replace(["\r", "\n", '"'], '', $name);
$cleanSubject = preg_replace('/[\r\n]+/', ' ', $subject);

$mailSubject = "[WEB][$typeUpper] $safeName";

$body = implode("\n", [
    "[WEB][$typeUpper] New message",
    str_repeat('-', 40),
    '',
    'Name:    ' . $name,
    'Email:   ' . $email,
    'Type:    ' . $typeUpper,
    $cleanSubject !== '' ? 'Subject: ' . $cleanSubject : '',
    '',
    'Message:',
    $message,
    '',
    str_repeat('-', 40),
    'Sent from: ' . ($_SERVER['HTTP_HOST'] ?? 'unknown host'),
    'Date:      ' . date('Y-m-d H:i:s T'),
]);

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Casual Brothers <contact@casualbrothers.com>',
    'Reply-To: "' . $safeName . '" <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
]);

$sent = mail($to, $mailSubject, $body, $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send email.']);
    exit;
}

echo json_encode(['ok' => true]);
