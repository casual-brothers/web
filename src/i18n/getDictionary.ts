const dictionaries = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;

export async function getDictionary(locale: string): Promise<Dictionary> {
  const loader = dictionaries[locale as keyof typeof dictionaries];
  if (!loader) {
    return dictionaries.en();
  }
  return loader();
}
