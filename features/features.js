const tips = document.getElementById('tips');
const foodSavingTips = [
    {
        tip: "הבשלה נכונה לאבוקדו",
        description: "אבוקדו מבשיל תוך 4-5 ימים בטמפרטורת החדר. להאצה, שים אותו בשקית עם בננה או תפוח."
    },
    {
        tip: "אחסון עשבי תיבול",
        description: "שמור עשבי תיבול כמו פטרוזיליה או כוסברה בכוס מים מכוסה בשקית ניילון במקרר – הם יישארו טריים יותר."
    },
    {
        tip: "שימוש בקליפות ירקות ופירות",
        description: "שמור קליפות ירקות כמו גזר ובצל להכנת ציר ירקות טעים ובריא."
    },
    {
        tip: "שימור בננות",
        description: "עטוף את גבעולי הבננות בניילון נצמד – זה יאט את ההבשלה."
    },
    {
        tip: "גבינות קשות",
        description: "מרח מעט חמאה או שמן זית על הקצוות של גבינה קשה כדי למנוע התייבשות."
    },
    {
        tip: "אחסון לחם",
        description: "שמור לחם בפריזר אם אינך מתכנן להשתמש בו בקרוב. הפשרה בטוסטר תחזיר לו את הטריות."
    },
    {
        tip: "חיתוך בצל ללא דמעות",
        description: "הכנס את הבצל למקפיא למשך 10 דקות לפני החיתוך – זה יקטין את הפרשת הגז שגורם לדמעות."
    },
    {
        tip: "שימור תותים",
        description: "שטוף תותים במים עם מעט חומץ (1:10) והייבש היטב לפני האחסון – זה יאריך את חייהם."
    },
    {
        tip: "החייאת ירקות רכים",
        description: "השרה ירקות רכים כמו גזר או סלרי בקערת מים קרים – הם יחזרו לחיים."
    },
    {
        tip: "שאריות יין",
        description: "הקפא שאריות יין בקוביות קרח לשימוש במתכונים עתידיים."
    },
    {
        tip: "אחסון תפוחי אדמה",
        description: "שמור תפוחי אדמה במקום קריר ויבש עם תפוח עץ – זה יאט את ההנבטה."
    },
    {
        tip: "שימור פירות יער",
        description: "פזר מעט סוכר על פירות יער לפני ההקפאה כדי לשמור על הטעם והמרקם."
    },
    {
        tip: "שימוש בשאריות אורז",
        description: "שאריות אורז יכולות להפוך לבסיס לפשטידה או להקפצה עם ירקות."
    },
    {
        tip: "גבינת קוטג' טרייה",
        description: "אחסן גבינת קוטג' או יוגורט הפוך (המכסה כלפי מטה) כדי למנוע כניסת אוויר ולשמור על הטריות."
    },
    {
        tip: "שימור ביצים",
        description: "בדוק אם ביצה טרייה: שים אותה בכוס מים. אם היא שוקעת, היא טרייה; אם היא צפה, עדיף להשליך אותה."
    },
    {
        tip: "אחסון תפוחים",
        description: "שמור תפוחים במקרר במקום קריר ויבש כדי להאט את הבשלתם."
    },
    {
        tip: "הימנעות מבזבוז לחם",
        description: "חתוך שאריות לחם לקוביות, טגן אותן קלות עם שמן זית ותבלינים כדי ליצור קרוטונים."
    },
    {
        tip: "הקפאת לימונים",
        description: "הקפא לימונים שלמים או סחוטים כדי להשתמש במיץ או קליפה כשצריך."
    },
    {
        tip: "שימור עגבניות",
        description: "עגבניות בשלות ניתן להקפיא בשלמותן ולהשתמש בהן להכנת רטבים או מרקים."
    },
    {
        tip: "תכנון ארוחות יעיל",
        description: "תכנן מראש את הארוחות שלך כדי להשתמש במוצרים שיש בבית לפני שקונים חדשים ולמנוע בזבוז."
    }
];

function getTips() {
    let currentTipIndex = 0;

    const headTitle = document.createElement('h1');
    const title = document.createElement('h2');
    const paragraph = document.createElement('p');
    paragraph.id = 'tipDesc';
    
    tips.innerHTML = '';
    headTitle.textContent = '!המלצה שלנו, חיסכון שלך'
    title.textContent = foodSavingTips[currentTipIndex].tip;
    paragraph.textContent = foodSavingTips[currentTipIndex].description;
    
    tips.appendChild(headTitle);
    tips.appendChild(title);
    tips.appendChild(paragraph);


    setInterval(() => {
        currentTipIndex = (currentTipIndex + 1) % foodSavingTips.length;
        title.textContent = foodSavingTips[currentTipIndex].tip;
        paragraph.textContent = foodSavingTips[currentTipIndex].description;
        tips.appendChild(title);
        tips.appendChild(paragraph);
    }, 5 * 1000);
}

getTips();

const iHaveEvent = document.getElementById("iHaveEventBtn");

iHaveEvent.addEventListener("click", () => {
    Swal.fire({
        title: 'פרט לי על האירוע',
        html: `
        <input type="number" id="amountOfPeople" class="swal2-input" placeholder="?כמה אנשים תהיו">
        <input type="text" id="kindOfEventInput" class="swal2-input" placeholder="?לאיזה אירוע מתכוננים">
        <input type="text" id="sensitivityInput" class="swal2-input" placeholder="?האם קיימת רגישות למשהו">
        <br>
        <span> במידה ואין רגישות לא לרשום כלום*</span>
        `,
        confirmButtonText: 'תרכיב לי ארוחה',
        showCancelButton: true,
        cancelButtonText: 'סגור',
        focusConfirm: false,
        preConfirm: () => {
            const amountOfPeople = document.getElementById('amountOfPeople').value;
            const kindOfEventInput = document.getElementById('kindOfEventInput').value;
            const sensitivityInput = document.getElementById('sensitivityInput').value;
            
            if (!amountOfPeople || !kindOfEventInput) {
                Swal.showValidationMessage('Please enter both fields');
            }
            
            return { amountOfPeople, kindOfEventInput, sensitivityInput };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if(result.value.sensitivityInput){
                const promptString = `יש לי אירוע ${result.value.kindOfEventInput} עם כמות אנשים של ${result.value.amountOfPeople} ויש רגישות ל${result.value.sensitivityInput} תן לי 2 רעיונות לארוחה מתאימה עם כמויות`
                console.log(promptString);
            }else{
                const promptString = `יש לי אירוע ${result.value.kindOfEventInput} עם כמות אנשים של ${result.value.amountOfPeople} תן לי 2 רעיונות לארוחה מתאימה עם כמויות`
                console.log(promptString);
            }
            console.log(result.value.amountOfPeople);
            console.log(result.value.kindOfEventInput);
            console.log(result.value.sensitivityInput);
        }
    });
});

const iHurry = document.getElementById("iHurryBtn");

iHurry.addEventListener("click", () => {
    Swal.fire({
        title: 'רגע של רעב, פתרון מהיר',
        html: `
            <h3>?ספר לי אלו מצרכים יש לך</h3>
            <input type="text" id="iHurryInput" class="swal2-input" placeholder="!כתוב לי מהר, בוא נזדרז">
            <input type="text" id="sensitivityInput" class="swal2-input" placeholder="?האם קיימת רגישות למשהו">
            <br>
            <span> במידה ואין רגישות לא לרשום כלום*</span>
        `,
        confirmButtonText: 'תרכיב לי ארוחה',
        showCancelButton: true,
        cancelButtonText: 'סגור',
        focusConfirm: false,
        preConfirm: () => {
            const iHurryInput = document.getElementById('iHurryInput').value;
            const sensitivityInput = document.getElementById('sensitivityInput').value;
            
            if (!iHurryInput) {
                Swal.showValidationMessage('Please enter the field');
            }
            
            return { iHurryInput, sensitivityInput };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if(result.value.sensitivityInput){
                const promptString = `אני ממהר תן לי מתכון מהיר עם המצרכים: ${result.value.iHurryInput} וכמויות, יש לי רגישות ל${result.value.sensitivityInput} `
                console.log(promptString);
            }else{
                const promptString = `אני ממהר תן לי מתכון מהיר עם המצרכים: ${result.value.iHurryInput} וכמויות`
                console.log(promptString);
            }
            console.log(result.value.iHurryInput);
            console.log(result.value.sensitivityInput);
        }
    });
});

const iHaveLeft = document.getElementById("iHaveLeftBtn");

iHaveLeft.addEventListener("click", () => {
    Swal.fire({
        title: 'ספר לי מה נשאר לך, אני אספר לך מה תאכל בעתיד',
        html: `
            <h3>?נו, אז אז את מי אנחנו משפרים</h3>
            <input type="text" id="iHaveLeftInput" class="swal2-input" placeholder="?מה נשאר לנו">
            <input type="text" id="sensitivityInput" class="swal2-input" placeholder="?האם קיימת רגישות למשהו">
            <br>
            <span> במידה ואין רגישות לא לרשום כלום*</span>
        `,
        confirmButtonText: '!תחיה לי את המנה',
        showCancelButton: true,
        cancelButtonText: 'סגור',
        focusConfirm: false,
        preConfirm: () => {
            const iHaveLeftInput = document.getElementById('iHaveLeftInput').value;
            const sensitivityInput = document.getElementById('sensitivityInput').value;
            
            if (!iHaveLeftInput) {
                Swal.showValidationMessage('Please enter the field');
            }
            
            return { iHaveLeftInput, sensitivityInput };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if(result.value.sensitivityInput){
                const promptString = `נשאר לי ${result.value.iHaveLeftInput} תן לי 2 רעיונות למתכון, יש לי רגישות ל${result.value.sensitivityInput}`
                console.log(promptString);
            }else{
                const promptString = `נשאר לי ${result.value.iHaveLeftInput} תן לי 2 רעיונות למתכון`
                console.log(promptString);
            }
            console.log(result.value.iHaveLeftInput);
            console.log(result.value.sensitivityInput);
        }
    });
});

const convertAmount = document.getElementById("convertAmountBtn");

convertAmount.addEventListener("click", () => {
    Swal.fire({
        title: '?מה תרצה להמיר',
        html: `
            <h3>אנא כתוב מה תרצה להמיר ומאיזו יחידת כמות</h3>
            <input type="text" id="convertAmountInput" class="swal2-input" placeholder="?מה ממירים">
        `,
        confirmButtonText: '!תמיר לי',
        showCancelButton: true,
        cancelButtonText: 'סגור',
        focusConfirm: false,
        preConfirm: () => {
            const convertAmountInput = document.getElementById('convertAmountInput').value;
            
            if (!convertAmountInput) {
                Swal.showValidationMessage('Please enter the field');
            }
            
            return { convertAmountInput };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const promptString = `תמיר לי ${result.value.convertAmountInput} לכל יחידות המידה`
            console.log(promptString);
        }
    });
});