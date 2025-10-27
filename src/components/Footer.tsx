interface FooterProps {
  t: any; // Adjust this type based on your translation object structure
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="text-center mt-8 p-4">
      <p>{t.footerPreparedBy}</p>
      <p>{t.footerContact}</p>
      <p>{t.footerCopyright}</p>
    </footer>
  );
}