import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./_lib/db";
import { getColor } from "./_lib/action";
import { Metadata } from "next";
import SideBar from "./components/sidebar";
import PageWrapper from "./components/pageWrapper";
import Header from "./components/header";
const inter = Inter({ subsets: ["latin"] });
async function saveUser(user: any) {
  "use server";
  noStore();

  if (user?.id) {
    const existingUser = await prisma.user.findUnique({
      where: { userId: user.id },
    });

    if (!existingUser) {
      const name = user.firstName || user.lastName
        ? `${user.firstName ?? ""} ${user.lastName ?? ""}`
        : user.given_name ?? "";

      await prisma.user.create({
        data: {
          email: user.email,
          userId: user.id,
          name,
        },
      });
    }
  }
}
export const metadata: Metadata = {
  title: {
    default: "Saad-Enterprises - the marketplace for furniture",
    template: "%s - Saad-Enterprises - the marketplace for furniture",
  },
  description: "Saad-Enterprises is an open-source marketplace for high-quality furniture.",
  twitter: {
    card: "summary_large_image",
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  await saveUser(user);
  const color = await getColor();
  return (
    <html lang="en">
      <body className={`${inter.className} ${color?.name ?? "theme-light-blue"}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="default"
          enableSystem
          disableTransitionOnChange
        >
          <SideBar />
          <div className="flex flex-col h-full w-full">
            <Header />
            <PageWrapper>
              {children}
            </PageWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}