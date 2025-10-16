import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground">
          Have a question or want to work together? Drop us a line.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
