<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? 'Newweb email test'));
$message = trim((string) ($_POST['message'] ?? ''));
$website = trim((string) ($_POST['website'] ?? ''));

if ($website !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please fill in name, email, and message.']);
    exit;
}

$to = 'contact@casualbrothers.com';
$cleanSubject = preg_replace('/[\r\n]+/', ' ', $subject);
$mailSubject = 'Newweb test: ' . $cleanSubject;

$body = implode("\n", [
    'Newweb email test',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Subject: ' . $cleanSubject,
    '',
    'Message:',
    $message,
    '',
    'Sent from: ' . ($_SERVER['HTTP_HOST'] ?? 'unknown host') . ($_SERVER['REQUEST_URI'] ?? ''),
]);

$safeName = str_replace(["\r", "\n", '"'], '', $name);
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Casual Brothers <contact@casualbrothers.com>',
    'Reply-To: "' . $safeName . '" <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($to, $mailSubject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'PHP mail() returned false.']);
    exit;
}

echo json_encode(['ok' => true]);
