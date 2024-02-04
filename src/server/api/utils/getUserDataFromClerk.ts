import clerk from "@clerk/clerk-sdk-node";

export const getUserDataFromClerk = async (
    id: string,
): Promise<{
    email: string;
    username: string;
}> => {
    const user = await clerk.users.getUser(id)

    if(!user.emailAddresses[0] || !user.username) throw new Error();

    return {
        email: user.emailAddresses[0].emailAddress,
        username: user.username
    }
}