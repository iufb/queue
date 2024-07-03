import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "@/shared/ui";

export const AdminLoginForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-3 p-4">
          <Input label="Логин" type="text" required />
          <Input label="Пароль" type="password" required />
          <Button>Войти</Button>
        </form>
      </CardContent>
    </Card>
  );
};
