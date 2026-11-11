import {
  author,
  instagram,
  linkedin,
  location,
  registrations,
  site,
  ventures,
  version,
} from "@/lib/site";

// llms.txt (https://llmstxt.org): a plain markdown map of the site for
// language models. Hand-kept; no registration numbers, by design.
export const dynamic = "force-static";

const { gumasta, udyam } = registrations;

const body = `# ${site.name}

> ${site.description}

## Business facts

- Business name: ${site.name}
- Entity type: sole proprietorship
- Registration: ${gumasta.label}, ${gumasta.act}, issued ${gumasta.firstRegistered} and amended ${gumasta.amended} by the ${gumasta.office}.
- Registration: ${udyam.label}, ${udyam.enterpriseType} enterprise, registered ${udyam.registered}.
- Registered activities: ${gumasta.activities.join("; ")}
- Proprietor: ${author.name}
- Team: ${author.name} (Founder), Simran Khanduja (Founding Member)
- Based in: ${location} (operations online and across India)
- Email: ${site.email}
- Legal and privacy: ${site.legalEmail}
- Website: ${site.url}
- Site version: ${version}

## Pages

- [Home](${site.url}/)
- [Team](${site.url}/team)
- [Business info](${site.url}/business-info): details for verifying the business, and each venture's contact, legal and privacy pages
- [Contact](${site.url}/contact)
- [Terms](${site.url}/terms)
- [Privacy](${site.url}/privacy)
- [Refunds](${site.url}/refunds)
- [Core](${site.url}/core)
- [Blog](${site.url}/blog)

## Ventures

${ventures.map((v) => `- [${v.name}](${v.href}): ${v.description} Instagram: ${v.instagram}`).join("\n")}

## Related

- [${author.name}](${author.url}): the founder. [LinkedIn](${linkedin}), [Instagram](${instagram})
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
