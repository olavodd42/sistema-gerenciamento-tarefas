'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import DatePicker from 'react-datepicker'

const sortOptions = [
  { name: 'Data', value: 'data', current: true },
  { name: 'Nome', value: 'nome', current: false },
]

const filters = [
  {
    id: 'concluido',
    name: 'concluido',
    options: [
      { name: 'Sim', value: 'true', current: false },
      { name: 'Não', value: 'false', current: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function FilterComponent({ setSortOption, setFilters, filters }) {
  const [concluido, setConcluido] = useState('');  // Variável para o filtro "concluído"

  const handleConcluidoChange = (event) => {
    const value = event.target.value;
    setConcluido(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      concluido: value,
    }));
  };

  return (
    <form className="mt-4 border-t border-gray-200">
      {filters.map((section) => (
        <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
          <h3 className="-mx-2 -my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-6">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        value={option.value}
                        checked={concluido === option.value}
                        id={option.value}
                        onChange={handleConcluidoChange}
                        type="radio"
                        name="concluido"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      />
                    </div>
                  </div>
                  <label htmlFor={option.value} className="min-w-0 flex-1 text-gray-500">
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
}

export default FilterComponent;