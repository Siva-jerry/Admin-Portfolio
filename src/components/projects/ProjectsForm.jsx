import "./ProjectsForm.css";


import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
    FiPlus,
    FiRefreshCw,
    FiUpload,
} from "react-icons/fi";
import { logActivity } from "../../services/activityService";

import {

    getProjects,

    createProject,

    updateProject,

    deleteProject,

    replaceProjectImage,

} from "../../services/projectsAdminService";

export default function ProjectsForm() {

    const [loading, setLoading] = useState(true);

    const [projects, setProjects] = useState([]);

    const [imageFiles, setImageFiles] = useState({});

    useEffect(() => {

        loadProjects();

    }, []);

    /*==================================================
    LOAD PROJECTS
    ==================================================*/

    async function loadProjects() {

        try {

            setLoading(true);

            const data = await getProjects();

            setProjects(data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Failed to load projects.",
});

        }

        finally {

            setLoading(false);

        }

    }

    /*==================================================
    ADD EMPTY PROJECT
    ==================================================*/

    function handleAddProject() {

        setProjects((prev) => [

            ...prev,

            {

                id: "new-" + Date.now(),

                title: "",

                description: "",

                category: "",

                image: "",

                imagePath: "",

                github: "",

                live: "",

                featured: false,

                order: prev.length + 1,

                technologies: [],

                isNew: true,

            },

        ]);

    }

    /*==================================================
    IMAGE SELECT
    ==================================================*/

    function handleImageSelect(

        projectId,

        file

    ) {

        if (!file) return;

        setImageFiles((prev) => ({

            ...prev,

            [projectId]: file,

        }));

    }

    if (loading) {

        return (

            <div className="projects-loading">

                Loading Projects...

            </div>

        );

    }
    return (

        <div className="projects-form">

            {/*==================================================
            HEADER
            ==================================================*/}

            <div className="projects-form-header">

                <div>

                    <h2>

                        Projects Management

                    </h2>

                    <p>

                        Create, edit and manage your portfolio projects.

                    </p>

                </div>

                <div className="projects-actions">

                    <button

                        type="button"

                        className="projects-refresh"

                        onClick={loadProjects}

                    >

                        <FiRefreshCw />

                        Refresh

                    </button>

                    <button

                        type="button"

                        className="projects-add"

                        onClick={async () => {

    const result = await Swal.fire({

        title: "Add New Project?",

        text: "A blank project form will be created.",

        icon: "question",

        showCancelButton: true,

        confirmButtonText: "Add Project",

        cancelButtonText: "Cancel",

        confirmButtonColor: "#4F46E5",

    });

    if (!result.isConfirmed) return;

    handleAddProject();

    Swal.fire({

        icon: "success",

        title: "Project Added",

        text: "You can now enter the project details.",

        timer: 1500,

        showConfirmButton: false,

    });

}}

                    >

                        <FiPlus />

                        Add Project

                    </button>

                </div>

            </div>

            {/*==================================================
            PROJECT LIST
            ==================================================*/}

            <div className="projects-list">

                {

                    projects.map((project, index) => (

                        <div

                            key={project.id}

                            className="project-card"

                        >
                            {/*==================================================
                            PROJECT IMAGE
                            ==================================================*/}

                            <div className="project-image-section">

                                <div className="project-image-preview">

                                    {

                                        project.image ? (

                                            <img

                                                src={project.image}

                                                alt={project.title}

                                            />

                                        ) : (

                                            <div className="project-image-placeholder">

                                                No Image

                                            </div>

                                        )

                                    }

                                </div>

                                <label className="project-upload-btn">

                                    <FiUpload />

                                    Upload Image

                                    <input

                                        hidden

                                        type="file"

                                        accept="image/*"

                                        onChange={(e) =>

                                            handleImageSelect(

                                                project.id,

                                                e.target.files[0]

                                            )

                                        }

                                    />

                                </label>

                                {

                                    imageFiles[project.id] && (

                                        <small>

                                            {

                                                imageFiles[project.id]

                                                    .name

                                            }

                                        </small>

                                    )

                                }

                            </div>

                            {/*==================================================
                            PROJECT DETAILS
                            ==================================================*/}

                            <div className="project-grid">

                                <div className="project-field">

                                    <label>

                                        Title

                                    </label>

                                    <input

                                        value={project.title}

                                        onChange={(e) => {

                                            const updated = [...projects];

                                            updated[index].title =

                                                e.target.value;

                                            setProjects(updated);

                                        }}

                                    />

                                </div>

                                <div className="project-field">

                                    <label>

                                        Category

                                    </label>

                                    <input

                                        value={project.category}

                                        onChange={(e) => {

                                            const updated = [...projects];

                                            updated[index].category =

                                                e.target.value;

                                            setProjects(updated);

                                        }}

                                    />

                                </div>

                                <div className="project-field project-full">

                                    <label>

                                        Description

                                    </label>

                                    <textarea

                                        rows="5"

                                        value={project.description}

                                        onChange={(e) => {

                                            const updated = [...projects];

                                            updated[index].description =

                                                e.target.value;

                                            setProjects(updated);

                                        }}

                                    />

                                </div>

                                <div className="project-field">

                                    <label>

                                        GitHub URL

                                    </label>

                                    <input

                                        value={project.github}

                                        onChange={(e) => {

                                            const updated = [...projects];

                                            updated[index].github =

                                                e.target.value;

                                            setProjects(updated);

                                        }}

                                    />

                                </div>

                                <div className="project-field">

                                    <label>

                                        Live Demo URL

                                    </label>

                                    <input

                                        value={project.live}

                                        onChange={(e) => {

                                            const updated = [...projects];

                                            updated[index].live =

                                                e.target.value;

                                            setProjects(updated);

                                        }}

                                    />

                                </div>

                                <div className="project-field">

                                    <label>

                                        Display Order

                                    </label>

                                    <input

                                        type="number"

                                        value={project.order}

                                        onChange={(e) => {

                                            const updated = [...projects];

                                            updated[index].order =

                                                e.target.value;

                                            setProjects(updated);

                                        }}

                                    />

                                </div>

                                <div className="project-field">

                                    <label>

                                        Featured

                                    </label>

                                    <select

                                        value={

                                            project.featured

                                                ? "true"

                                                : "false"

                                        }

                                        onChange={(e) => {

                                            const updated = [...projects];

                                            updated[index].featured =

                                                e.target.value === "true";

                                            setProjects(updated);

                                        }}

                                    >

                                        <option value="true">

                                            Yes

                                        </option>

                                        <option value="false">

                                            No

                                        </option>

                                    </select>

                                </div>

                            </div>
                            {/*==================================================
                            TECHNOLOGIES
                            ==================================================*/}

                            <div className="project-section">

                                <div className="project-section-header">

                                    <h3>

                                        Technologies

                                    </h3>

                                    <button

                                        type="button"

                                        className="project-add-btn"

                                        onClick={() => {

                                            const updated = [...projects];

                                            updated[index].technologies = [

                                                ...(updated[index].technologies || []),

                                                "",

                                            ];

                                            setProjects(updated);

                                        }}

                                    >

                                        + Add Technology

                                    </button>

                                </div>

                                {

                                    (project.technologies || []).map(

                                        (technology, techIndex) => (

                                            <div

                                                key={techIndex}

                                                className="technology-row"

                                            >

                                                <input

                                                    placeholder="Technology"

                                                    value={technology}

                                                    onChange={(e) => {

                                                        const updated = [...projects];

                                                        updated[index].technologies[techIndex] =

                                                            e.target.value;

                                                        setProjects(updated);

                                                    }}

                                                />

                                                <button

                                                    type="button"

                                                    className="delete-btn"

                                                    onClick={async () => {

                                                        const result = await Swal.fire({

    title: "Delete Technology?",

    text: "This technology will be removed.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#DC2626",

    cancelButtonColor: "#64748B",

    confirmButtonText: "Delete",

});

if (!result.isConfirmed) {

    return;

}

                                                        const updated = [...projects];

                                                        updated[index].technologies =

                                                            updated[index].technologies.filter(

                                                                (_, i) =>

                                                                    i !== techIndex

                                                            );

                                                        setProjects(updated);

                                                    }}

                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        )

                                    )

                                }

                            </div>
                            {/*==================================================
                            ACTION BUTTONS
                            ==================================================*/}

                            <div className="project-buttons">

                                <button

                                    type="button"

                                    className="project-save"

                                    onClick={async () => {

                                        try {
                                            Swal.fire({

    title: project.isNew
        ? "Creating Project..."
        : "Updating Project...",

    text: "Please wait while we save your project.",

    allowOutsideClick: false,

    allowEscapeKey: false,

    didOpen: () => {

        Swal.showLoading();

    },

});

                                            const updatedProject = {

                                                ...project,

                                            };

                                            /*----------------------------
                                            IMAGE
                                            ----------------------------*/

                                            if (

                                                imageFiles[project.id]

                                            ) {

                                                const result =

                                                    await replaceProjectImage(

                                                        project.imagePath,

                                                        imageFiles[project.id]

                                                    );

                                                updatedProject.image =

                                                    result.url;

                                                updatedProject.imagePath =

                                                    result.path;

                                            }

                                            /*----------------------------
                                            SAVE
                                            ----------------------------*/

                                            if (project.isNew) {

    await createProject(updatedProject);

    await logActivity({

        action: "Created Project",

        section: "Projects",

        description: updatedProject.title,

        type: "create",

    });

}

                                           else {

    await updateProject(

        project.id,

        updatedProject

    );

    await logActivity({

        action: "Updated Project",

        section: "Projects",

        description: updatedProject.title,

        type: "update",

    });

}
                                            

                                          Swal.close();

await loadProjects();

await Swal.fire({

    icon: "success",

    title: "Saved!",

    text: "Project saved successfully.",

    confirmButtonColor: "#4F46E5",

});

                                        }

                                        catch (error) {
                                            Swal.close();

                                            console.error(

                                                error

                                            );

                                            Swal.fire({

    icon: "error",

    title: "Save Failed",

    text: "Unable to save project.",

});

                                        }

                                    }}

                                >

                                    Save Project

                                </button>

                                <button

                                    type="button"

                                    className="project-delete"

                                    onClick={async () => {

                                        if (

                                            project.isNew

                                        ) {

                                            setProjects(

                                                projects.filter(

                                                    (

                                                        _,

                                                        i

                                                    ) =>

                                                        i !==

                                                        index

                                                )

                                            );

                                            return;

                                        }

                                        const result = await Swal.fire({

    title: "Delete Project?",

    text: "This action cannot be undone.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#DC2626",

    cancelButtonColor: "#64748B",

    confirmButtonText: "Delete",

    cancelButtonText: "Cancel",

});

if (!result.isConfirmed) {

    return;

}

                                        try {
                                            Swal.fire({

    title: "Deleting Project...",

    text: "Please wait.",

    allowOutsideClick: false,

    allowEscapeKey: false,

    didOpen: () => {

        Swal.showLoading();

    },

});

                                            await deleteProject(

                                                project

                                            );
                                            await logActivity({

    action: "Deleted Project",

    section: "Projects",

    description: project.title,

    type: "delete",

});

                                           Swal.close();

await loadProjects();

await Swal.fire({

    icon:"success",

    title:"Deleted!",

    text:"Project removed successfully.",

    confirmButtonColor:"#4F46E5",

});

                                        }

                                        catch (error) {

                                            console.error(

                                                error

                                            );

                                            Swal.close();

Swal.fire({

    icon:"error",

    title:"Delete Failed",

    text:"Unable to delete project.",

});

                                        }

                                    }}

                                >

                                    Delete Project

                                </button>

                            </div>
                            </div>

                    ))

                }

            </div>

        </div>

    );

}