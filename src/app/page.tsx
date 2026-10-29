import React from "react";
import { getPortfolioData } from "@/lib/portfolioService";
import { PortfolioHome } from "@/components/PortfolioHome";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const data = await getPortfolioData();
    return <PortfolioHome initialData={data} />;
  } catch (error) {
    // If SSR direct read is pending or in edge warmup, client boundary fetches from /api/content
    return <PortfolioHome />;
  }
}
