import { useState } from 'react';

//chakra
import {
  Button,
  Box,
  Text,
  FormLabel,
  Input,
  FormControl
} from '@chakra-ui/react';

//components
import ChevronDown from 'src/components/icons/ChevronDown';
import ChevronUp from 'src/components/icons/ChevronUp';
import Plus from 'src/components/icons/Plus';
import Trash from 'src/components/icons/Trash';
import { IExtraPrice, IMenuItem } from 'src/interfaces';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  name: string;
  addLabel: string;
  value: IExtraPrice[];
  add: () => void;
  remove: any;
  register: UseFormRegister<IMenuItem>;
  id: 'sizes' | 'extraIngredientPrices';
}

const MenuItemPriceProps = (props: Props) => {
  const { name, addLabel, value, add, remove, register, id } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // function addProp() {
  //   setProps((oldProps: any) => {
  //     return [...oldProps, { name: '', price: 0 }];
  //   });
  // }

  // function editProp(ev: any, index: any, prop: any) {
  //   const newValue = ev.target.value;
  //   setProps((prevSizes: any) => {
  //     const newSizes = [...prevSizes];
  //     newSizes[index][prop] = newValue;
  //     return newSizes;
  //   });
  // }

  // function removeProp(indexToRemove: any) {
  //   setProps((prev: any) =>
  //     prev.filter((v: any, index: any) => index !== indexToRemove)
  //   );
  // }

  return (
    <Box className="bg-gray-200 p-2 rounded-md mb-2">
      <Button
        onClick={() => setIsOpen(prev => !prev)}
        type="button"
        display="inline-flex"
        p={1}
        justifyContent="flex-start"
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <Text>{name}</Text>
        <Text>({value.length})</Text>
      </Button>
      <FormControl className={isOpen ? 'block' : 'hidden'}>
        {value &&
          value?.length > 0 &&
          value.map((size: IExtraPrice, index: number) => (
            <Box key={index} className="flex items-end gap-2">
              <Box>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register(`${id}.${index}.name`)}
                  type="text"
                  placeholder="Size name"
                />
              </Box>
              <Box>
                <FormLabel>Extra price</FormLabel>
                <Input
                  {...register(`${id}.${index}.price`)}
                  type="text"
                  placeholder="Extra price"
                />
              </Box>
              <Box>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-white mb-2 px-2"
                >
                  <Trash />
                </Button>
              </Box>
            </Box>
          ))}
        <Button type="button" onClick={add} className="bg-white items-center">
          <Plus className="w-4 h-4" />
          <Text>{addLabel}</Text>
        </Button>
      </FormControl>
    </Box>
  );
};

export default MenuItemPriceProps;
