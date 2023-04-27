import { User } from "@prisma/client";
import { useForm } from "react-hook-form";

import { Alert, useDismissible } from "../../common/Alert";
import { Button } from "../../common/Button/Button";
import { MainHeading } from "../../common/MainHeading";

import { api } from "@/utils/api";
import { FormGroup } from "@/components/common/form/FormGroup";

export const ProfileScreen = () => {
  const { dismiss, show, isDisplayed } = useDismissible();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const updateDisplayName = api.User.updateDisplayName.useMutation();

  api.User.getUser.useQuery(undefined, {
    onSuccess(userData: User) {
      setValue("displayName", userData.displayName ?? userData?.name);
    },
  });

  const ctx = api.useContext();

  const handleProfileSubmit = async (data: any) => {
    await updateDisplayName.mutateAsync({
      displayName: data.displayName,
    });
    ctx.User.getUser.invalidate();
    show();
  };

  return (
    <>
      <MainHeading title="Tu Perfil" />

      {isDisplayed && (
        <Alert message="Your profile has been sucessfully updated." onClose={dismiss} />
      )}

      <h2 className="mb-4 text-2xl">
        <span className="font-bold">Información personal</span>
      </h2>

      <form className="w-1/3" onSubmit={handleSubmit(handleProfileSubmit)}>
        <FormGroup
          error={errors.displayName && "Display name is required"}
          label="Nombre de usuario"
          name="displayName"
        >
          <input
            className="focus:ring-primary-500 mb-2 rounded-md bg-slate-100 p-2 focus:border-transparent focus:outline-none focus:ring-2"
            id="displayName"
            {...register("displayName", { required: true })}
          />
        </FormGroup>
        <Button className="self-end" isLoading={updateDisplayName.isLoading}>
          Actualizar
        </Button>
      </form>
    </>
  );
};
