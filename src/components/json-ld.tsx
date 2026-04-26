type Props = {
  data: object | object[];
  id?: string;
};

export function JsonLd({ data, id }: Props) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type GraphProps = {
  id?: string;
  nodes: object[];
};

/**
 * Emits multiple JSON-LD nodes inside a single `<script>` tag using
 * schema.org's @graph pattern. Reduces script tag overhead and keeps
 * the document outline tidier than emitting N separate <script>s.
 */
export function JsonLdGraph({ id, nodes }: GraphProps) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": nodes.map((n) => {
      // Strip per-node @context since it's hoisted to the graph root.
      const copy = { ...(n as Record<string, unknown>) };
      delete copy["@context"];
      return copy;
    }),
  };
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
