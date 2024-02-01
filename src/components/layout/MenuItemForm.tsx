'use client';
import { useEffect, useState } from 'react';

//chakra
import {
  useDisclosure,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Image,
  Input,
  Select,
  Text
} from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
//component
import Plus from 'src/components/icons/Plus';
import Trash from 'src/components/icons/Trash';
import EditableImage from 'src/components/layout/EditableImage';
import MenuItemPriceProps from 'src/components/layout/MenuItemPriceProps';
import ModalDelete from '../menuitem/ModalDelete';

//react-hook-form
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { ICategory, IMenuItem } from 'src/interfaces';

//redux
import { useGetCategoriesQuery } from 'src/redux/services/categoryApi';
import {
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation
} from 'src/redux/services/menuItemApi';
import { useUpdateMenuItemMutation } from 'src/redux/services/menuItemApi';
import { useDeleteImageMutation } from 'src/redux/services/menuItemApi';

//icons
import { FaTrashCan } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

//cloudinary
import { CldUploadWidget } from 'next-cloudinary';
import toast from 'react-hot-toast';

interface Props {
  onSubmit: () => void;
  menuItem: IMenuItem | null;
}

const MenuItemForm = (props: Props) => {
  const { menuItem } = props;
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState<string>('');

  const { data: categories } = useGetCategoriesQuery();

  const [deleteImage] = useDeleteImageMutation();
  const [createMenuItem, { isLoading: loadingCreate }] =
    useCreateMenuItemMutation();

  const [updateMenuItem, { isLoading: loadingUpdate }] =
    useUpdateMenuItemMutation();

  const [deleteMenuItem, { isLoading: loadingDelete }] =
    useDeleteMenuItemMutation();

  useEffect(() => {
    if (menuItem?.image) {
      setImage(menuItem.image);
    }
  }, []);

  const { register, control, handleSubmit, watch } = useForm<IMenuItem>({
    defaultValues: menuItem
      ? menuItem
      : {
          image,
          name: '',
          description: '',
          basePrice: 0,
          sizes: [],
          category: '',
          extraIngredientPrices: []
        }
  });

  const {
    fields: sizes,
    append: appendSize,
    remove: removeSize
  } = useFieldArray({
    control,
    name: 'sizes'
  });

  const {
    fields: ingredient,
    append: appendIngredient,
    remove: removeIngredient
  } = useFieldArray({
    control,
    name: 'extraIngredientPrices'
  });

  const handleDeleteImage = async () => {
    if (image) {
      const public_id = image.substring(62, image.length - 4);
      await deleteImage(public_id)
        .unwrap()
        .then((res: any) => {
          setImage('');
        })
        .catch(e => console.log(e));
    }
  };

  const onSubmit: SubmitHandler<IMenuItem> = async data => {
    const formData = { ...data, image: image };
    if (menuItem === null) {
      await createMenuItem(formData)
        .unwrap()
        .then(res => {
          toast.success(`Create product ${res.name} successfully`);
        })
        .catch(e => console.log(e));
    } else {
      await updateMenuItem(formData)
        .unwrap()
        .then(res => {
          toast.success(`Update product ${res.name} successfully`);
        })
        .catch(e => console.log(e));
    }
  };

  const handleDeleteItem = async () => {
    console.log(menuItem?._id);
    await deleteMenuItem(menuItem?._id!)
      .unwrap()
      .then(res => {
        toast.success(`Delete product ${res?.name} successfully`);
        router.back();
      })
      .catch(e => console.log(e));
  };

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 max-w-2xl mx-auto"
    >
      <Grid
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <Box>
          <CldUploadWidget
            uploadPreset="food_order"
            options={{
              folder: 'foodorder/menuitem',
              sources: ['local', 'url', 'google_drive'],
              multiple: false,
              styles: {}
            }}
            onSuccess={(result: any) => {
              setImage(result.info.secure_url);
            }}
            onError={error => {
              console.log(error);
            }}
          >
            {({ open }) => {
              return (
                <Box w={160} h={160} position="relative">
                  <Image
                    minHeight={160}
                    borderRadius={8}
                    src={
                      image
                        ? image
                        : 'https://res.cloudinary.com/dadvtny30/image/upload/v1706669140/foodorder/menuitem/gz16qwknqddqqvvnontw.jpg'
                    }
                    objectFit="contain"
                  />
                  <Button
                    position="absolute"
                    top={0}
                    right={-12}
                    w={10}
                    onClick={handleDeleteImage}
                  >
                    <Icon as={FaTrashCan} />
                  </Button>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      open();
                    }}
                    position="absolute"
                    bottom={0}
                    right={-12}
                    w={10}
                  >
                    <Icon as={MdEdit} />
                  </Button>
                </Box>
              );
            }}
          </CldUploadWidget>
        </Box>
        <Box className="grow">
          <Box>
            <FormLabel>Item name</FormLabel>
            <Input {...register('name')} type="text" placeholder="Enter name" />
          </Box>
          <Box>
            <FormLabel>Description</FormLabel>
            <Input
              {...register('description')}
              type="text"
              placeholder="Enter description"
            />
          </Box>
          <Box>
            <FormLabel>Category</FormLabel>
            <Select {...register('category')} placeholder="Choose category">
              {categories &&
                categories?.length &&
                categories.map((category: ICategory) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </Select>
          </Box>
          <Box>
            <FormLabel>Base price</FormLabel>
            <Input {...register('basePrice')} type="text" />
          </Box>
          <MenuItemPriceProps
            id="sizes"
            name={'Sizes'}
            addLabel={'Add item size'}
            value={sizes}
            add={() => {
              appendSize({ name: '', price: 0 });
            }}
            remove={removeSize}
            register={register}
          />
          <MenuItemPriceProps
            id="extraIngredientPrices"
            name={'Extra ingredients'}
            addLabel={'Add ingredients prices'}
            value={ingredient}
            add={() => {
              appendIngredient({ name: '', price: 0 });
            }}
            remove={removeIngredient}
            register={register}
          />
          {menuItem === null ? (
            <Button disabled={loadingCreate} type="submit">
              {loadingCreate ? (
                <CircularProgress isIndeterminate color="white" size="24px" />
              ) : (
                <Text>Create</Text>
              )}
            </Button>
          ) : (
            <Flex gap={2}>
              <Button disabled={loadingUpdate} type="submit">
                {loadingUpdate ? (
                  <CircularProgress isIndeterminate color="white" size="24px" />
                ) : (
                  <Text>Save</Text>
                )}
              </Button>
              <Button disabled={loadingDelete} onClick={onOpen}>
                {loadingDelete ? (
                  <CircularProgress isIndeterminate color="white" size="24px" />
                ) : (
                  <Text>Delete</Text>
                )}
              </Button>
              <ModalDelete
                isOpen={isOpen}
                onClose={onClose}
                handleDeleteItem={handleDeleteItem}
              />
            </Flex>
          )}
        </Box>
      </Grid>
    </FormControl>
  );
};

export default MenuItemForm;
