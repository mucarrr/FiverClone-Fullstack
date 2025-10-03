import { FaBriefcase, FaBullhorn, FaLaptopCode, FaMusic, FaPaintBrush, FaPenFancy, FaRobot, FaUserTie, FaVideo } from "react-icons/fa";

export const categories = [
    {
        name: "Programming & Technology",
        icon: <FaLaptopCode />
    },
    {
        name: "Graphics & Design",
        icon: <FaPaintBrush />
    },
    {
        name: "Digital Marketing",
        icon: <FaBullhorn />
    },
    {
        name: "Writing & Translation",
        icon: <FaPenFancy />
    },
    {
        name: "Video & Animation",
        icon: <FaVideo />
    },
    {
        name: "AI Services",
        icon: <FaRobot />
    },
    {
        name: "Music & Audio",
        icon: <FaMusic />
    },
    {
        name: "Business",
        icon: <FaBriefcase />
    },
    {
        name: "Consulting",
        icon: <FaUserTie />
    }
]


export const items = [
    {
        title: "Expert hiring consultants",
        text: "Trust an account manager to find the right talent and meet every need of your project."
    },
    {
        title: "Satisfaction guarantee",
        text: "Order with confidence with guaranteed refunds for incomplete deliveries.",
    },
    {
        title: "Advanced management tools",
        text: "Seamlessly integrate freelancers into your team and projects.",
    },
    {
        title: "Flexible payment models",
        text: "Pay per project or choose hourly rate options for longer-term collaborations.",
    },
]

export const notFound = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="

export const inputs = [
    {
        label: "Title",
        name: "title",
        required: true,
    },
    {
        label: "Description",
        name: "description",
        required: true,
    },
    {
        label : "Package Title",
        name: "packageTitle",
        required: true,
    },
    {
        label: "Cover Image",
        name: "coverImage",
        required: true,
        type: "file",
    },
    {
        label: "Images",
        name: "images",
        required: true,
        type: "file",
        multiple: true,
    },
    {
        label: "Package Revision",
        name: "packageRevision",
        required: true,
        type: "number",
        min: 1,
    },
    {
        label: "Package Features",
        name: "packageFeatures",
        required: true,
        type: "textarea",
    },
    {
        label: "Package Description",
        name: "packageDescription",
        required: true,
    },
    {
        label: "Package Duration",
        name: "packageDuration",
        required: true,
        type: "number",
        min: 1,
    },
    {
        label: "Package Price",
        name: "packagePrice",
        required: true,
        type: "number",
        min: 1,
    },
    
]
