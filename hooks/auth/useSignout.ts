import { clearUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/reduxHook";
import { useSignoutMutation } from "@/redux/services/auth/authApiSlice";

const useSignout = () => {
  const dispatch = useAppDispatch();
  const [signout, { isLoading }] = useSignoutMutation();

  const handleSignout = async () => {
    try {
      await signout({}).unwrap();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      dispatch(clearUser());
    }
  };

  return { handleSignout, isLoading };
};

export default useSignout;
