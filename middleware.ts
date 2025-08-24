import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const ua = request.headers.get("user-agent") || "";

    // Ignore les bots
    const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(ua);
    if (isBot) return NextResponse.next();

    // Détection device
    const isTablet =
        /(iPad|Tablet)/i.test(ua) ||
        (/(Android)/i.test(ua) && !/Mobile/i.test(ua));

    const isMobile =
        !isTablet &&
        /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    const deviceType = isMobile ? "mobile" : "desktop";

    const response = NextResponse.next();
    response.cookies.set("deviceType", deviceType, {
        path: "/",
        domain: ".peur-de-la-conduite.fr",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    return response;
}

export const config = {
    matcher: ["/", "/((?!_next|api|robots.txt|sitemap.xml|favicon.ico).*)"],
};
