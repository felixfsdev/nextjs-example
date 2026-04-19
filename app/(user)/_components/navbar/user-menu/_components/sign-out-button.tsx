import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="justify-start text-destructive hover:text-destructive focus:text-destructive active:text-destructive"
        >
          <LogOut className="mr-2 size-4" />
          Sign Out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent aria-describedby="sign-out">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            If you sign out, you will have to sign in again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
