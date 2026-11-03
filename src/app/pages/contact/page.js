import { site } from "@/config/site";
export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="container section narrow prose">
      <h1>Contact</h1>
      <p>Questions about an order, sizing or exchanges? We usually reply within a day.</p>
      <p>Email: <a href={`mailto:${site.email}`}>{site.email}</a><br />Phone / WhatsApp: {site.phone}</p>
    </div>
  );
}
