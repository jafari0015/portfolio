import { createClient } from "@sanity/client";
export const client = createClient ({
    projectId:'4cja3wup',
    dataset:'production',
    apiVersion:"2025-08-30",
    useCdn:true,
});