"use client"

import { useMemo } from "react"
import parse from "html-react-parser"
import Link from "next/link"

interface HTMLRendererProps {
  htmlString: string
}

export function HTMLRenderer({ htmlString }: HTMLRendererProps) {
  const parsedElement = useMemo(() => {
    return parse(htmlString, {
      replace: (domNode: any) => {
        if (domNode.attribs && domNode.attribs.href && domNode.name === "a") {
          return (
            <Link href={domNode.attribs.href} className="text-blue-600 hover:underline">
              {domNode.children[0].data}
            </Link>
          )
        } else if (domNode.name === "script") {
          return <></>
        }
      },
    })
  }, [htmlString])

  return <div className="richtext-wrapper text-xs">{parsedElement}</div>
}
