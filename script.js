const myUploadedList = document.getElementById("myUploadedList")

document.addEventListener('DOMContentLoaded', function() {
    const getMyList= () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.forEach(item => {
            console.log(item.ItemName)
            const li = document.createElement("li");
            li.textContent = item.ItemName;
            myUploadedList.appendChild(li);
        });
    } 

    getMyList();
    
    const ctx = document.getElementById('myChart').getContext('2d');

    const data = {
        labels: ['בשר', 'חלב', 'פירות', 'ירקות', 'ביצים', 'Rice'],
        datasets: [{
            label: 'כמות',
            data: [2, 1.5, 3, 6, 7, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribution of Products'
                }
            }
        }
    };

    new Chart(ctx, config);
});

