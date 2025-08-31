export default {
    name:"work",
    type:"document",
    title:"Work / Project",
    fields: [
        {
            name:"title",
            type:"string",
            title:"Project Title"
        },
        {
            name:"description",
            type:"text",
            title:"Description",
        },
        {
            name:"image",
            type:"image",
            title:"Project Image",
            options:{ hotspot : true },
        },
        {
            name: "link",
            type: "url" ,
            title:"Live Project URL",
        },
        {
            name:"github",
            type:"url",
            title:"Github Repository (optional)",
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: { source: "title" , maxLenght: 96 }
        },
        {
            name: "techStack",
            type:"array",
            title: "Tech Stack",
            of:[{type:"string"}],
        },
    ],
};