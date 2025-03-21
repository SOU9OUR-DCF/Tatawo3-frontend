import Divider from "@/components/Divider";
import { Button } from "@/components/ui/button";
import { useLoadingStore } from "@/stores/loading";

function OAuthButtons() {
  const { isLoading } = useLoadingStore();

  return (
    <>
      <Divider content="OR" />

      <div className="w-full flex flex-col items-center gap-2">
        <Button className="w-full" disabled={isLoading}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12.037 21.998a10.3 10.3 0 0 1-7.168-3.049a9.9 9.9 0 0 1-2.868-7.118a9.95 9.95 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.94 9.94 0 0 1 6.614 2.564L16.457 6.88a6.2 6.2 0 0 0-4.131-1.566a6.9 6.9 0 0 0-4.794 1.913a6.62 6.62 0 0 0-2.045 4.657a6.6 6.6 0 0 0 1.882 4.723a6.9 6.9 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678q.113.927.1 1.859c-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
              clipRule="evenodd"
            ></path>
          </svg>
          Sign in with Google
        </Button>
      </div>
    </>
  );
}

export default OAuthButtons;
