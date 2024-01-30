import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Stack,
  Text
} from '@chakra-ui/react';

//interface
import { IUserInfo } from 'src/interfaces';

//react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form';

//redux
import { useUpdateUserInfoMutation } from 'src/redux/services/userApi';
import toast from 'react-hot-toast';

//country-state-city
import {
  Country,
  ICountry,
  State,
  IState,
  City,
  ICity
} from 'country-state-city';
import { useEffect, useState } from 'react';

interface Props {
  info: IUserInfo;
}

const AddressInputs = (props: Props) => {
  const { info } = props;

  const countryData: ICountry[] = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<string>(info.country);

  const [stateByCountry, setStateByCountry] = useState<IState[]>(() => {
    if (info.country) {
      const stateData = State.getStatesOfCountry(info.country);
      return stateData;
    }
    return [];
  });

  // const [selectedStatusCodeState, setSelectedStatusCodeState] =
  //   useState<string>(info.city);

  // const [cityByState, setCityByState] = useState<ICity[]>([]);

  useEffect(() => {
    const stateData = State.getStatesOfCountry(selectedCountry);
    setStateByCountry(stateData);
  }, [selectedCountry]);

  // useEffect(() => {
  //   console.log(selectedCountry, selectedStatusCodeState);
  //   const cityData = City.getCitiesOfState(
  //     selectedCountry!,
  //     selectedStatusCodeState!
  //   );
  //   // setCityByState(cityData);
  // }, [selectedCountry, selectedStatusCodeState]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserInfo>({
    defaultValues: {
      _id: info._id,
      phone: info.phone,
      streetAddress: info.streetAddress,
      postalCode: info.postalCode,
      city: info.city,
      country: info.country,
      role: info.role
    }
  });

  const [UpdateInfo, { isLoading }] = useUpdateUserInfoMutation();

  const onSubmit: SubmitHandler<IUserInfo> = async data => {
    await UpdateInfo(data)
      .unwrap()
      .then(() => {
        toast.success('Update successfully');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormLabel>Phone</FormLabel>
        <Input {...register('phone')} type="text" placeholder="Phone number" />
      </Stack>

      <Grid className="grid grid-cols-2 gap-2">
        <Stack>
          <FormLabel>Country</FormLabel>
          <Select
            {...register('country')}
            placeholder="Country"
            onChange={e => setSelectedCountry(e.target.value)}
          >
            {countryData.length &&
              countryData.map((country: ICountry) => (
                <option value={country.isoCode}>{country.name}</option>
              ))}
          </Select>
        </Stack>
        <Stack>
          <FormLabel>City</FormLabel>
          <Select {...register('city')} placeholder="City">
            {stateByCountry.length &&
              stateByCountry.map((state: IState) => (
                <option value={state.isoCode}>{state.name}</option>
              ))}
          </Select>
        </Stack>
      </Grid>

      <Grid className="grid grid-cols-2 gap-2">
        <Stack>
          <FormLabel>Postal code</FormLabel>
          <Input
            {...register('postalCode')}
            type="text"
            placeholder="Postal code"
          />
        </Stack>
        <Stack>
          <FormLabel>Role</FormLabel>
          <Select
            {...register('role')}
            placeholder="Select role"
            disabled={true}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="CUSTOMER">CUSTOMER</option>
          </Select>
        </Stack>
      </Grid>

      <Stack>
        <FormLabel>Street Address</FormLabel>
        <Input
          {...register('streetAddress')}
          type="text"
          placeholder="Street address"
        />
      </Stack>

      <Button as="button" disabled={isLoading} type="submit">
        {isLoading ? (
          <CircularProgress isIndeterminate color="white" size={24} />
        ) : (
          <Text>Save</Text>
        )}
      </Button>
    </FormControl>
  );
};

export default AddressInputs;
