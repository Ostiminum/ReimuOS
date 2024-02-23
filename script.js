const FILES = [
    "liham.jpg",
    "reimu.gif"
];

const COMMANDS = [
    ["buksan <filename>", "bubukas ng isang file na nagkaugnay sa binigay na file name (lalabas ng ERROR kapag walang nakitang file na nagkaugnay sa binigay na file name)."],
    ["dir", "mag-display ng mga pangalan ng mga files at folder na nakalagay sa kasalukayang folder."],
    ["linis", "tatangalin ang lahat na mga text na naka-display sa console."],
    ["tulong", "mag-display ng mga commands na sinusuporta ng system."],
    ["reimu", "reimu"]
];

let created_boxes = 0;

window.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        document.getElementById("terminal-text" + created_boxes).readOnly = true;

        process_command();

        created_boxes += 1;

        create_terminal_box();
    }
})

function os_setup() {
    let welcome_box = document.createElement("div");
    welcome_box.classList.add("box");
    welcome_box.classList.add("welcome-box");

    let welcome_text1 = document.createElement("p");
    welcome_text1.appendChild(document.createTextNode(
        "ReimuOS [Bersyon 1.0]."
    ));

    let welcome_text2 = document.createElement("p");
    welcome_text2.appendChild(document.createTextNode(
        "I-type ang 'tulong' para sa listahan ng mga commands na sinusuporta ng system."
    ));
    
    welcome_box.appendChild(welcome_text1);
    welcome_box.appendChild(document.createElement("br"));
    welcome_box.appendChild(welcome_text2);    
    welcome_box.appendChild(document.createElement("br"));
    welcome_box.appendChild(document.createElement("p"));

    document.body.appendChild(welcome_box);

    create_terminal_box();
}

function process_command() {
    let current_text = document.getElementById("terminal-text" + created_boxes).value.trim();

    let valid_input = false;

    if (current_text.startsWith("buksan ")) {
        filename = current_text.substring(7).trim();

        for (let i = 0; i < FILES.length; ++i) {
            if (FILES[i] == filename) {
                valid_input = true

                let img_box = document.createElement("div");
                img_box.classList.add("box");

                let img_element = document.createElement("img");
                let img_path = document.createAttribute("src");
                img_path.value = FILES[i];

                img_element.setAttributeNode(img_path);
                img_box.appendChild(img_element);

                document.body.appendChild(img_box);
                break
            }
        }
    } else if (current_text == "dir") {
        valid_input = true;

        let directory_box = document.createElement("div");
        directory_box.classList.add("box");
        directory_box.classList.add("directory-box");

        for (let i = 0; i < FILES.length; ++i) {
            directory_box.appendChild(create_para("- " + FILES[i]));

            if (i < FILES.length - 1) {
                directory_box.appendChild(document.createElement("br"));
            }
        }

        document.body.appendChild(directory_box);
    } else if (current_text == "linis") {
        valid_input = true;

        current_boxes = document.getElementsByClassName("box");

        while (current_boxes.length > 0) {
            current_boxes[0].remove();
        }
    } else if (current_text == "tulong") {
        valid_input = true;
        
        let new_helpBox = document.createElement("div");
        new_helpBox.classList.add("box");
        new_helpBox.classList.add("help-box");

        new_helpBox.appendChild(
            create_para("Ito ang listahan ng mga commands na sinusuporta ng system:")
        );

        new_helpBox.appendChild(document.createElement("br"));

        for (let i = 0; i < COMMANDS.length; ++i) {
            new_helpBox.appendChild(create_para(`'${COMMANDS[i][0]}' - ${COMMANDS[i][1]}`));

            if (i < COMMANDS.length - 1) {
                new_helpBox.appendChild(document.createElement("br"));
            }
        }

        document.body.appendChild(new_helpBox);
    } else if (current_text == "reimu") {
        valid_input = true;

        let reimu_box = document.createElement("div");
        reimu_box.classList.add("box");
        reimu_box.classList.add("reimu-box");

        let reimu_gif = document.createElement("img");
        reimu_gif_path = document.createAttribute("src");
        reimu_gif_path.value = "reimu.gif";

        reimu_gif.setAttributeNode(reimu_gif_path);

        reimu_box.appendChild(reimu_gif);
        document.body.appendChild(reimu_box);
    }

    if (!valid_input) {
        // displays an ERROR box
        let new_errorBox = document.createElement("div");
        new_errorBox.classList.add("box");
        new_errorBox.classList.add("error-box");

        let new_errorBoxText = document.createElement("p");
        new_errorBoxText.appendChild(document.createTextNode(
            "Hindi angkop ang command na ibinigay. I-type ang 'tulong' para sa listahan ng mga commands na sinusuporta ng system."
        ));

        new_errorBox.appendChild(new_errorBoxText);

        document.body.appendChild(new_errorBox);
    }
}

function create_para(text) {
    let new_para = document.createElement("p");

    new_para.appendChild(
        document.createTextNode(text)
    );

    return new_para;
}

function create_terminal_box() {
    let new_terminalBox = document.createElement("div");
    new_terminalBox.classList.add("box");
    new_terminalBox.classList.add("terminal-textbox");

    let indicator = document.createElement("p");
    indicator.appendChild(document.createTextNode("tahanan> "))

    let text_field = document.createElement("input");
    text_field.classList.add("terminal-text");
    text_field.type = "text";
    text_field.id = "terminal-text" + created_boxes;

    new_terminalBox.appendChild(indicator);
    new_terminalBox.appendChild(text_field);

    document.body.appendChild(new_terminalBox);
    document.getElementById("terminal-text" + created_boxes).focus();
}