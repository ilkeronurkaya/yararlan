'use client';
import { useLanguage } from './LanguageContext';

export default function LocalizedString({ id }: { id: string }) {
  const { t } = useLanguage();
  return <>{t(id)}</>;
}
