import { Playfair, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

const playFair = Playfair({
  variable: "--font-playFair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
});

export const metadata = {
  title: "Giftopia - Handmade Gifts for Every Occasion",
  description:
    "Discover unique handmade gifts and party favors for weddings, baby showers, graduations, and more. Find the perfect personalized touch for your special events with our curated selection of artisanal products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playFair.variable} ${poppins.variable} antialiased`}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
