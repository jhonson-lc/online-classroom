import { Button, Variant } from "../../common/Button/Button";
import { MainHeading } from "../../common/MainHeading";

import { useSession } from "@/libs/useSession";

export const ClassroomsScreen = () => {
  const { data: session } = useSession();
  return (
    <>
      <MainHeading title={"Mis cursos y tutorías"}>
        {session?.user.role === "teacher" && (
          <Button variant={Variant.Primary}>Crear un curso</Button>
        )}
      </MainHeading>
      <span>
        <p>Tus cursos</p>
      </span>
    </>
  );
};
