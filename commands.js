class Command {
    constructor(command, description = null, aliases = null, cooldown = null, permissions = null, syntax = null, exampleUserMsg = null, exampleBotMsg = null, exampleTwitchMsg = null) {
        this.name = command.cmd;
        this.text = command.text
        this.description = description;
        this.aliases = aliases;
        this.cooldown = cooldown;
        this.permissions = permissions;
        this.syntax = syntax;
        this.exampleUserMsg = exampleUserMsg;
        this.exampleBotMsg = exampleBotMsg;
        this.exampleTwitchMsg = exampleTwitchMsg;
    }

    getInfoTable() {
        let table = document.createElement("table");
        table.classList.add("infoTable");

        if (this.description !== null) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = "Команда";
            tr.append(td);
            td = document.createElement("td");
            td.innerHTML = GetFormattedStringSpan(this.description);
            tr.append(td);
            table.append(tr);
        }
        if (this.aliases !== null) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = "Элиасы";
            tr.append(td);
            td = document.createElement("td");
            td.innerHTML = GetFormattedStringSpan(this.aliases);
            tr.append(td);
            table.append(tr);
        }
        if (this.cooldown !== null) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = "Cooldown";
            tr.append(td);
            td = document.createElement("td");
            td.textContent = `${this.cooldown} сек.`;
            tr.append(td);
            table.append(tr);
        }
        if (this.permissions !== null) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = "Доступ";
            tr.append(td);
            td = document.createElement("td");
            if (this.permissions.badges) {
                this.permissions.badges.forEach(b => {
                    td.append(CreateBadge(b));
                });
            }
            let spanUser = document.createElement("span");
            let spanUserMsg = document.createElement("span");
            spanUser.classList.add("permissions");
            spanUserMsg.textContent = this.permissions.msg;
            spanUserMsg.classList.add("permissionsMsg");
            td.append(spanUser, spanUserMsg, document.createElement("br"));

            tr.append(td);
            table.append(tr);
        }
        if (this.syntax !== null) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = "Написание";
            tr.append(td);
            td = document.createElement("td");
            td.innerHTML = GetFormattedStringSpan(this.syntax);
            tr.append(td);
            table.append(tr);
        }
        if ([this.exampleUserMsg, this.exampleBotMsg, this.exampleTwitchMsg].some((param) => param !== null)) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = "Пример использования";
            tr.append(td);
            td = document.createElement("td");

            if (this.exampleUserMsg !== null) {
                if (this.exampleUserMsg.badges) {
                    this.exampleUserMsg.badges.forEach(b => {
                        td.append(CreateBadge(b));
                    });
                }
                let spanUser = document.createElement("span");
                let spanUserMsg = document.createElement("span");
                spanUser.textContent = "mooncat3:";
                spanUser.classList.add("exampleUsername");
                spanUserMsg.textContent = this.exampleUserMsg.msg;
                spanUserMsg.classList.add("exampleNicknameMsg");
                td.append(spanUser, spanUserMsg, document.createElement("br"));
            }
            if (this.exampleBotMsg !== null) {
                console.log(this.exampleBotMsg.msg);
                this.exampleBotMsg.msg.forEach(m => {
                    if (this.exampleBotMsg.badges) {
                        this.exampleBotMsg.badges.forEach(b => {
                            td.append(CreateBadge(b));
                        });
                    }
                    let spanBot = document.createElement("span");
                    let spanBotMsg = document.createElement("span");
                    spanBot.textContent = "BasedgeBot:";
                    spanBot.classList.add("exampleBot");
                    spanBotMsg.innerHTML = GetFormattedStringSpan(m);
                    spanBotMsg.classList.add("exampleBotMsg");
                    td.append(spanBot, spanBotMsg, document.createElement("br"));
                });
            }
            if (this.exampleTwitchMsg !== null) {
                let spanTwitchMsg = document.createElement("span");
                spanTwitchMsg.textContent = this.exampleTwitchMsg;
                spanTwitchMsg.classList.add("exampleTwitchMsg");
                td.append(spanTwitchMsg);
            }

            tr.append(td);
            table.append(tr);
        }
        return table;
    }
}

function CreateBadge(badge) {
    let badgeElem = document.createElement("img");
    badgeElem.classList.add("userIcon");
    badgeElem.src = badge.image;
    if (badge.title) {
        let tooltipElem;
        badgeElem.onmouseover = function () {
            tooltipElem = document.createElement('div');
            tooltipElem.className = 'tooltip';
            tooltipElem.textContent = badge.title;
            document.body.append(tooltipElem);
            const badgeCoords = badgeElem.getBoundingClientRect();
            const left = badgeCoords.left + (badgeElem.offsetWidth - tooltipElem.offsetWidth) / 2;
            const top = badgeCoords.top - tooltipElem.offsetHeight - 5;
            tooltipElem.style.left = left + 'px';
            tooltipElem.style.top = top + 'px';
        }

        badgeElem.onmouseout = function () {
            if (tooltipElem) {
                tooltipElem.remove();
                tooltipElem = null;
            }
        };
    }
    return badgeElem

}

const Badges = {
    mod: { image: "images/mod.png", title: "Moderator" },
    vip: { image: "images/vip.png", title: "VIP" },
    glitch: { image: "images/glitch.png", title: "GlitchCon 2020" },
    no_video: { image: "images/no-video.png", title: "Watching without video" },
    broadcaster: { image: "images/broadcaster.png", title: "Broadcaster" },
    sub: { image: "images/sub.png", title: "Subscriber" },
}

const CommandsList = [
    new Command({ cmd: "!color"}, "Цвет никнейма", "!цвет", 3, { msg: "Все" }, "!color",
        { msg: "!цвет", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["&mooncat3, твой цвет Салатовый"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!debug" }, "Сообщить об ошибке", null, 30, { msg: "Все" }, "!debug [сообщение]$message",
        { msg: "!debug Не работает команда", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["&mooncat3, сообщение отправлено"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!en", text: "NEW" }, "Транслирует кириллицу в латиницу", null,10, { msg: "Все" }, "!en [сообщение]$message",
        { msg: "!en Руддщ умукнщту", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["mooncat3 -> Hello everyone"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!forecast" }, "Прогноз погоды на 3 дня", "!прогноз",30, { msg: "Все" }, "!forecast [объект/город/страна]$region",
        { msg: "!прогноз Москва", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["mooncat3, прогноз для Москва, Россия. Вторник: +28°C 🌤 Облачно с прояснениями. Среда: +30°C ☁ Пасмурно. Четверг: +29°C 🌧 Небольшой дождь"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!math" }, "Решение примера", "!калькулятор",5, { msg: "Все" }, "!math [любой математический пример]$problem",
        { msg: "!math 2*2", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["mooncat3,  2*2 = 4"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!ru", text: "NEW"  }, "Транслирует латиницу в кириллицу", null,10, { msg: "Все" }, "!ru [сообщение]$message",
        { msg: "!ru Dctv ghbdtn", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["mooncat3 -> Всем привет"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!weather" }, "Прогноз погоды на сегодня","!погода", 30, { msg: "Все" }, "!weather [объект/город/страна]$region",
        { msg: "!погода Москва", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["mooncat3, погода в Москва, Россия. 🕑 Местное время - 18:15 🌡 +27°C (ощущается как +26°C) 🌤 Облачно с прояснениями 💧 Влажность - 41% 💨 1.6м/с 🌆 Закат в 20:35"], badges: [Badges.mod, Badges.no_video]}),
];

const GameCommandsList = [
    new Command({ cmd: "!roulette" }, "Русская рулетка", "!рулетка",5, { badges: [Badges.vip, Badges.sub] },"!roulette",
        { msg: "!рулетка", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["mooncat3 жмет на курок..."], badges: [Badges.mod, Badges.no_video]}, "basedgebot timed out mooncat3 for 60 seconds."),
];

const AdminCommandsList = [
        new Command({ cmd: "!add" }, "Добавить кастомную команду",null, 0, { badges: [Badges.mod] },"!add [название команды]$command [кд в секундах]$cooldown [сообщение]$message",
        { msg: "!add !вк 10 vk.com/me", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["Команда !вк добавлена"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!ban" }, "Блокировка пользователя", null,0, { badges: [Badges.mod] },"!ban [пользователь]$user [причина]$reason",
        { msg: "!ban morange51 п-ворд", badges: [Badges.broadcaster, Badges.glitch] },
        null, "basedgebot banned morange51. Reason: п-ворд."),
    new Command({ cmd: "!block" }, "Добавить пользователя в черный список", null,0, { badges: [Badges.mod] },"!block [пользователь]$user",
        { msg: "!block morange51", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["Morange51 игнорируется"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!c" }, "Включить/выключить команды", null,0, { badges: [Badges.mod] },"!c",
        { msg: "!c", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["Команды включены"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!del" }, "Удалить кастомную команду", null,0, { badges: [Badges.mod] },"!del [название команды]$command",
        { msg: "!del !вк", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["Команда !вк удалена"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!g" }, "Включить/выключить игры", null,0, { badges: [Badges.mod] },"!g",
        { msg: "!g", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["Игры выключены"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!info" }, "Кастомные команды канала", null,0, { badges: [Badges.mod, Badges.vip, Badges.sub] },"!info",
        { msg: "!info", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["mooncat3, !тг, !дс, !инст, !0"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!mute" }, "Таймаут пользователя", null,0, { badges: [Badges.mod] },"!mute [пользователь]$user [время таймаута]$seconds [причина]$reason",
        { msg: "!mute morange51 60 спам", badges: [Badges.broadcaster, Badges.glitch] },
        null, "basedgebot timed out morange51 for 60 seconds. Reason: спам."),
    new Command({ cmd: "!spam" }, "Спам фразой", null,3, { badges: [Badges.mod, Badges.vip] },"!spam [количество]$amount [сообщение]$message",
        { msg: "!spam 5 Подписывайтесь на мой телеграм - t.me/", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["Подписывайтесь на мой телеграм - t.me/", "Подписывайтесь на мой телеграм - t.me/", "Подписывайтесь на мой телеграм - t.me/", "Подписывайтесь на мой телеграм - t.me/", "Подписывайтесь на мой телеграм - t.me/"], badges: [Badges.mod, Badges.no_video]}),
    new Command({ cmd: "!unban" }, "Разжалование пользователя", null,0,{ badges: [Badges.mod] },"!unban [пользователь]$user",
        { msg: "!unban morange51", badges: [Badges.broadcaster, Badges.glitch] },
        null, "basedgebot removed ban on morange51."),
    new Command({ cmd: "!unblock" }, "Удалить пользователя из черного списка", null,0,{ badges: [Badges.mod] },"!unblock [пользователь]$user",
        { msg: "!unblock morange51", badges: [Badges.broadcaster, Badges.glitch] },
        { msg: ["Morange51 больше не игнорируется"], badges: [Badges.mod, Badges.no_video]}),
];

const TestCommandsList = [
    new Command("test page")
];