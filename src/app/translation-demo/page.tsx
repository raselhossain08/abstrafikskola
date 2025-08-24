import { TranslationDemo } from '@/components/common/TranslationDemo';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function TranslationDemoPage() {
  return (
    <LanguageProvider>
      <TranslationDemo />
    </LanguageProvider>
  );
}
