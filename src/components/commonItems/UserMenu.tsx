import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/router";

async function handleLogout() {
  try {
    await signOut({ callbackUrl: "http://localhost:3000" });
    // console.log("hello logout")
    // const router = useRouter();
    // router.push("/");
  } catch (err) {
    console.log(err);
  }
}

export function UserMenu() {
  const { data } = useSession();
  const user = data?.user;
  const userImg = user?.image;
  const userName = user?.name;
  const userExists = user && userImg && userName;

  if (!userExists) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-brand-light/60 m-0 flex h-11 w-11 items-center justify-center rounded-full"
        >
          <div className="bg-brand-light absolute h-6 w-6 animate-ping rounded-full" />
          <Avatar className={`h-9 w-9`}>
            <AvatarImage src={userImg} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href={"/profile"}>
            <DropdownMenuItem
              className={
                "focus:bg-brand-light focus:text-dark cursor-pointer rounded-full pl-4"
              }
            >
              Profile
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="focus:bg-dark focus:text-dark cursor-pointer rounded-full pl-4"
          onClick={handleLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
