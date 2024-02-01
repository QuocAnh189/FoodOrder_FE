'use client';
import { useState } from 'react';

//chakra
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Input,
  Text,
  useDisclosure
} from '@chakra-ui/react';

//component
import DeleteButton from 'src/components/DeleteButton';
import UserTabs from 'src/components/layout/UserTabs';

//Modal
import ModalDelete from 'src/components/category/ModalDelete';
import ModalUpdate from 'src/components/category/ModalUpdate';

//toast
import toast from 'react-hot-toast';

//redux
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} from 'src/redux/services/categoryApi';
import { ICategory } from 'src/interfaces';

interface ItemCategoryProps {
  category: ICategory;
}

const ItemCategory = (props: ItemCategoryProps) => {
  const { category } = props;
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete
  } = useDisclosure();

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate
  } = useDisclosure();

  const [editedCategory, setEditedCategory] = useState<any>(null);

  const [updateCategory, { isLoading: loadingUpdate }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: loadingDelete }] =
    useDeleteCategoryMutation();

  const handleUpdateCategory = async (data: ICategory) => {
    await updateCategory(data)
      .unwrap()
      .then(res => {
        toast.success(`Update category ${res.name} successfully`);
        onCloseUpdate();
      })
      .catch(e => {
        const message = e.data.message;
        switch (message) {
          case 'category already exists':
            toast.error('Category already exists');
            break;
          default:
            break;
        }
      });
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (id) {
      await deleteCategory(id)
        .unwrap()
        .then(res => {
          toast.success(`Create category ${name} successfully`);
          onCloseDelete();
        })
        .catch(e => {
          const message = e.data.message;
          switch (message) {
            case 'category already exists':
              toast.error('Category already exists');
              break;
            default:
              break;
          }
        });
    }
  };

  return (
    <Box
      key={category._id}
      className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
    >
      <Box className="grow">{category.name}</Box>
      <Box className="flex gap-1">
        <Button
          className="hover:bg-gray-400"
          type="button"
          onClick={() => {
            setEditedCategory(category.name);
            onOpenUpdate();
          }}
        >
          {loadingUpdate ? <CircularProgress size="24px" /> : <Text>Edit</Text>}
        </Button>
        <ModalUpdate
          isOpen={isOpenUpdate}
          onClose={onCloseUpdate}
          handleUpdateCategory={() => {
            handleUpdateCategory({ _id: category._id, name: editedCategory });
          }}
          editedCategory={editedCategory}
          setEditedCategory={setEditedCategory}
        />
        <Box>
          <Button
            className="hover:bg-gray-400"
            type="button"
            onClick={onOpenDelete}
          >
            {loadingDelete ? (
              <CircularProgress size="24px" />
            ) : (
              <Text>Delete</Text>
            )}
          </Button>
          <ModalDelete
            isOpen={isOpenDelete}
            onClose={onCloseDelete}
            handleDeleteCategory={() => {
              handleDeleteCategory(category._id!, category.name);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState<string>('');

  const [createCategory, { isLoading: loadingCreate }] =
    useCreateCategoryMutation();

  const { data: categories } = useGetCategoriesQuery();

  const handleCreateCategory = async (e: any) => {
    e.preventDefault();
    if (categoryName) {
      const data: ICategory = { name: categoryName };
      await createCategory(data)
        .unwrap()
        .then(res => {
          setCategoryName('');
          toast.success(`Create category ${res.name} successfully`);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <Box>
        <UserTabs isAdmin={true} />
        <FormControl as="form" className="mt-8" onSubmit={handleCreateCategory}>
          <Box className="flex gap-2 items-end">
            <Box className="grow">
              <Input
                type="text"
                value={categoryName}
                onChange={ev => setCategoryName(ev.target.value)}
              />
            </Box>
            <Box className="pb-2 flex gap-2">
              <Button className="border border-primary" type="submit">
                {loadingCreate ? (
                  <CircularProgress size="24px" />
                ) : (
                  <Text>Create</Text>
                )}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  categories && setCategoryName('');
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </FormControl>
        <Box>
          <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
          {categories &&
            categories?.length > 0 &&
            categories.map((category: ICategory) => (
              <ItemCategory category={category} />
            ))}
        </Box>
      </Box>
    </section>
  );
};

export default CategoriesPage;
