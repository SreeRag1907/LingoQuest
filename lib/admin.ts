import { auth } from "@clerk/nextjs/server";

const adminIds = [
    "user_2jxDVAu7W8df8r11RzsgsRwxjGP",
]
export const isAdmin = () => {
    const {userId} = auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
}