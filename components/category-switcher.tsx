"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/select-button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Category } from "@/types";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface CategorySwitcherProps extends PopoverTriggerProps {
  items: Category[];
}

export default function CategorySwitcher({
  className,
  items = [],
}: CategorySwitcherProps) {
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentCategory = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  const onStoreSelect = (category: { value: string; label: string }) => {
    router.push(`/category/${category.value}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecione uma Loja"
          className={cn(
            "justify-between border-none gap-x-2 text-sm font-medium text-neutral-500",
            className
          )}
        >
          Categorias
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {formattedItems.map((category) => (
                <CommandItem
                  key={category.value}
                  onSelect={() => onStoreSelect(category)}
                  className="text-sm"
                >
                  {category.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentCategory?.value === category.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
