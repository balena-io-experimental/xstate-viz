import React from 'react';
import styled from 'styled-components';
import { Interpreter, State } from 'xstate';
import { parseMarkdown } from './markdown';

const StyledField = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  margin-top: 0.5rem;
  width: 100%;
  overflow: hidden;

  > label {
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.5em;
    font-weight: bold;
    opacity: 0.5;
  }

  &[data-empty] {
    opacity: 0.5;
    > label {
      margin-bottom: 0;
    }
  }
`;

const StyledDocs = styled.div`
  & & {
    border-left: 2px solid #737373;
  }

  > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: block;
    margin-bottom: 0.5em;
    font-weight: bold;
    opacity: 0.5;
    font-size: 12.8px;
  }

  > h1 {
    text-decoration: underline;
  }

  > h3 {
    font-size: 12px;
    font-style: italic;
  }

  > h4 {
    font-size: 12px;
    font-weight: 500;
    font-style: italic;
  }

  > h5 {
    font-weight: 500;
    font-style: italic;
    font-size: 11.2px;
  }

  > h6 {
    font-weight: 500;
    font-size: 11.2px;
  }

  > p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre {
    font-size: 11.2px;
    margin-top: 0;
    margin-bottom: 10px;
  }

  a {
    color: var(--color-link)
    text-decoration: none;
  }
`;

interface FieldProps {
  label?: string;
  children: any;
  disabled?: boolean;
  style?: any;
}
function Field({ label, children, disabled, style }: FieldProps) {
  return (
    <StyledField
      style={{ ...style, ...(disabled ? { opacity: 0.5 } : undefined) }}
      data-empty={!children || undefined}
    >
      <label>{label}</label>
      {children}
    </StyledField>
  );
}

const StyledDetails = styled.details`
  margin: 0;
  padding: 0 1rem;

  & & {
    border-left: 2px solid #737373;
  }

  > summary {
    font-weight: bold;
    font-size: 1rem;
  }
`;

function mergeDocs(meta: any) {
  const docs = Object.keys(meta)
    .sort()
    .reduce((map, key) => {
      const entry = meta[key];

      // if meta entry has documentation
      if (entry.description) {
        // generate titles from state hierarchy
        key.split('.').reduce((parent, child, index) => {
          const id = [parent, child].join('.');
          const title =
            id === key && entry.title
              ? entry.title
              : child.charAt(0).toUpperCase() + child.slice(1);
          if (!map.has(id)) {
            map.set(id, ['#'.repeat(index + 1) + ' ' + title]);
          }
          return id;
        });

        if (!map.has(key)) {
          map.set(key, []);
        }

        // append documentation body
        map.get(key)?.push(entry.description);
      }

      return map;
    }, new Map<string, string[]>());

  if (docs.size === 0) {
    return 'No documentation has been provided for this chart';
  }

  return Array.from(docs)
    .map(([_, value]) => value.join('\n\n'))
    .join('\n\n');
}

export const DocsPanel: React.FunctionComponent<{
  state: State<any, any>;
  service: Interpreter<any>;
}> = ({ state, service }) => {
  const markdown = mergeDocs(state.meta);

  return (
    <StyledDetails key={service.id} open={true}>
      <summary>{service.id}</summary>
      <Field label="description">
        <StyledDocs
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(markdown)
          }}
        ></StyledDocs>
      </Field>
      <Field label="Children">
        {Array.from((service as any).children.values()).map((child: any, i) => {
          if (!child.state) {
            return null;
          }

          return <DocsPanel state={child.state} service={child} key={i} />;
        })}
      </Field>
    </StyledDetails>
  );
};
