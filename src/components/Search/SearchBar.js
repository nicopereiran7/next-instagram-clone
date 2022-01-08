import { SearchIcon } from "@heroicons/react/outline";
import { useState, useMemo, useRef } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import Link from "next/link";

export default function SearchBar(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Buscar",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "offers-next-api",
            getItems: ({ query: term }) => {
              if (!!term) {
                return fetch(`/api/search/${term}`).then((res) => res.json());
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form
      ref={formRef}
      className="w-full bg-[#efefef] p-2 rounded-lg"
      {...formProps}
    >
      <div className="flex items-center relative">
        <SearchIcon className="h-5 w-5" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar"
          className="w-full focus:outline-none bg-[#efefef] px-2"
          {...inputProps}
        />
      </div>
      {autocompleteState.isOpen && (
        <div
          className="w-[280px] absolute mt-4 bg-white rounded-lg shadow-lg z-10 overflow-hidden"
          ref={panelRef}
          {...autocomplete.getPanelProps()}
        >
          {autocompleteState.collections.map((collection, index) => {
            const { items } = collection;
            return (
              <section key={index}>
                {items.length > 0 && (
                  <ul {...autocomplete.getListProps()}>
                    {items.map((item, index) => (
                      <AutocompleteItem key={index} {...item} />
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}
    </form>
  );
}

const AutocompleteItem = ({ name, username }) => {
  return (
    <li>
      <Link href={`/${username}`}>
        <a className="hover:bg-slate-100 flex items-center gap-4 p-4">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-xs">{username}</p>
        </a>
      </Link>
    </li>
  );
};
