import { Link } from '@tanstack/react-router'
import { navigation } from './navigation'
import React from 'react'
import { Separator } from '../../ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion'

const VerticalNavbar: React.FC<{ getLabel: (item: string) => void }> = ({
  getLabel,
}) => {
  return (
    <div className="flex flex-col w-64 text-[#d0cde4] bg-[#2f3349] p-3 h-lvh">
      <div className="text-2xl font-bold flex gap-2 items-center justify-center pb-3">
        <img src="../src/assets/logo.png" alt="logo" height={50} width={50} />
        School Vision
      </div>
      <Separator />
      <nav>
        {navigation?.map((menu, i) => {
          if (menu.isParent) {
            return (
              <Accordion
                key={`${menu}-${i}`}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="hover:bg-[#3d4056] mt-2 p-2 pl-4 rounded">
                    <span className="inline-flex items-center justify-center gap-1">
                      {menu.icon} {menu.label}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {menu.children?.map((subItem, subIndex) => (
                      <Link
                        key={`${subIndex}-${i}`}
                        to={subItem.link}
                        className="flex items-center mt-2 py-2 px-8
                                hover:bg-[#3d4056] rounded w-full justify-start font-normal"
                        activeProps={{
                          className: 'bg-primary hover:bg-primary text-[white]',
                        }}
                        onClick={() => getLabel(subItem.label)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          } else {
            return (
              <Link
                key={`${menu}-${i}`}
                className="flex gap-2 items-center mt-2 py-2 px-4
              hover:bg-[#3d4056] rounded text-lg"
                activeProps={{
                  className: 'bg-primary hover:bg-primary text-[white]',
                }}
                to={menu.link}
                onClick={() => getLabel(menu.label)}
              >
                <span className="inline-flex items-center justify-center gap-1">
                  {menu.icon} {menu.label}
                </span>
              </Link>
            )
          }
        })}
      </nav>
    </div>
  )
}

export default VerticalNavbar
