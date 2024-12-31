import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';

interface DropdownProps {
  selectedIndex: number;
  options: { choice_name: string, odds: number}[];
  onSelect: any;
}

export default function PTWDropdown({ selectedIndex, options=[], onSelect }: DropdownProps) {

  const menuItems = options.map((option, index) => {
    return (
      <MenuItem key={index}>
        {({ active }) => (
        <button
          className={clsx(
            'group flex w-full items-center rounded-md px-2 py-2 text-md font-inter',
            (active) ? 'bg-gray-700 text-slate-200' : 'text-gray-700',
            (selectedIndex == index) ? 'border-2 border-gray-700' : '' 
          )}
          onClick={() => onSelect(index)}>
        {option.choice_name}
        </button>
    )}
      </MenuItem>
    )
  })

  return (
    <Menu as="div" className="text-left">
      <div>
        <MenuButton className=" max-w-[12rem] flex gap-4 justify-left rounded-md bg-slate-200 hover:drop-shadow-lg hXXXover:shadow-black/50 duration-300 text-gray-700 px-4 py-2 text-sm font-medium whitespace-nowrap border-[1.5px] border-gray-700 ">
          <div className='overflow-hidden'>{options[selectedIndex].choice_name}</div>
          <ChevronDownIcon
            className="-mr-1 ml-2 my-auto h-5 w-5 text-gray-700 "
            aria-hidden="true"
          />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-[70%]"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-[70%]" 
      >
        <MenuItems className="p-1 font-inter font-medium z-[9999] w-[9rem] absolute origin-top-right rounded-md bg-slate-200 text-gray-700 shadow-lg shadow-black/50">
            {menuItems}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
