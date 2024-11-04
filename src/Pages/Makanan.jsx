import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import FoodDetailModal from './FoodDetailModal';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Makanan.css';

const Makanan = () => {
    const [selectedFood, setSelectedFood] = useState(null);

    // Inisialisasi AOS dengan konfigurasi
    useEffect(() => {
        AOS.init({ duration: 500, once: true });
    }, []);

    // Data rekomendasi makanan dengan 10 item dan informasi lengkap
    const foods = [
        { 
            title: 'Yogurt Putih Kental Stroberi', 
            imageUrl: '/assets/images/yogurt.jpg', 
            duration: '10 Minutes', 
            calories: '200 Cal',
            ingredients: [
                '1 cup plain yogurt',
                '1/2 cup strawberries',
                '1 tbsp honey',
                'Granola for topping'
            ],
            tutorial: 'Campurkan yogurt dengan madu, tambahkan potongan stroberi di atasnya, dan taburkan granola untuk topping. Sajikan dingin.'
        },
        { 
            title: 'Oseng Oseng Salmon', 
            imageUrl: '/assets/images/salmon.jpg', 
            duration: '25 Minutes', 
            calories: '350 Cal',
            ingredients: [
                '200g salmon fillet',
                '1 cup asparagus',
                '2 tbsp olive oil',
                'Salt and pepper to taste'
            ],
            tutorial: 'Panaskan minyak zaitun di wajan, masak salmon hingga kecoklatan, tambahkan asparagus, dan bumbui dengan garam serta lada.'
        },
        { 
            title: 'Roti Tawar Pake Telor', 
            imageUrl: '/assets/images/roti-telur.jpg', 
            duration: '15 Minutes', 
            calories: '250 Cal',
            ingredients: [
                '2 slices of bread',
                '2 eggs',
                'Salt and pepper to taste',
                'Butter for frying'
            ],
            tutorial: 'Panaskan sedikit mentega di wajan, goreng roti hingga kecoklatan. Tambahkan telur di atas roti dan bumbui dengan garam serta lada.'
        },
        { 
            title: 'Jus Stroberi', 
            imageUrl: '/assets/images/jus-stroberi.jpg', 
            duration: '10 Minutes', 
            calories: '120 Cal',
            ingredients: [
                '1 cup strawberries',
                '1 cup water or milk',
                '1 tbsp sugar (optional)',
                'Ice cubes'
            ],
            tutorial: 'Campurkan stroberi, air atau susu, dan gula jika diinginkan. Blender hingga halus, tambahkan es batu, dan sajikan.'
        },
        { 
            title: 'Smoothie Pisang', 
            imageUrl: '/assets/images/smoothie-pisang.jpg', 
            duration: '10 Minutes', 
            calories: '150 Cal',
            ingredients: [
                '1 banana',
                '1 cup milk or yogurt',
                '1 tbsp honey',
                'Ice cubes'
            ],
            tutorial: 'Campurkan pisang, susu atau yogurt, dan madu. Blender hingga halus, tambahkan es batu jika diinginkan, dan sajikan.'
        },
        { 
            title: 'Salad Buah Segar', 
            imageUrl: '/assets/images/salad-buah.jpg', 
            duration: '10 Minutes', 
            calories: '180 Cal',
            ingredients: [
                '1 cup mixed fruits (e.g., apple, grapes, orange)',
                '1 tbsp honey',
                '1 tsp lemon juice',
                'Mint leaves for garnish'
            ],
            tutorial: 'Campurkan buah-buahan, madu, dan jus lemon. Aduk hingga merata, tambahkan daun mint untuk hiasan, dan sajikan.'
        },
        { 
            title: 'Sereal dengan Susu', 
            imageUrl: '/assets/images/sereal-susu.jpg', 
            duration: '5 Minutes', 
            calories: '220 Cal',
            ingredients: [
                '1 cup cereal',
                '1 cup milk',
                'Fruit toppings (optional)'
            ],
            tutorial: 'Tuangkan susu di atas sereal dalam mangkuk. Tambahkan buah sesuai selera untuk topping, dan sajikan segera.'
        },
        { 
            title: 'Telur Rebus', 
            imageUrl: '/assets/images/telur-rebus.jpg', 
            duration: '10 Minutes', 
            calories: '70 Cal',
            ingredients: [
                '2 eggs',
                'Water',
                'Salt and pepper to taste'
            ],
            tutorial: 'Rebus telur dalam air mendidih selama 7-10 menit sesuai tingkat kematangan yang diinginkan. Tambahkan garam dan lada sebelum disajikan.'
        },
        { 
            title: 'Avocado Toast', 
            imageUrl: '/assets/images/avocado-toast.jpg', 
            duration: '15 Minutes', 
            calories: '250 Cal',
            ingredients: [
                '2 slices of bread',
                '1 ripe avocado',
                'Salt and pepper to taste',
                'Lemon juice'
            ],
            tutorial: 'Tumbuk alpukat dengan sedikit jus lemon, garam, dan lada. Oleskan di atas roti panggang, tambahkan topping jika diinginkan, dan sajikan.'
        },
        { 
            title: 'Pancake Pisang', 
            imageUrl: '/assets/images/pancake-pisang.jpg', 
            duration: '20 Minutes', 
            calories: '300 Cal',
            ingredients: [
                '1 banana, mashed',
                '1 egg',
                '1/2 cup flour',
                '1/2 cup milk',
                'Butter for cooking'
            ],
            tutorial: 'Campurkan pisang, telur, tepung, dan susu hingga membentuk adonan. Panaskan mentega di wajan, tuangkan adonan, dan masak hingga kecoklatan.'
        }
    ];

    // Data untuk makanan highlight (Food Recommendation Of The Day)
    const highlightFood = {
        title: 'Jus Wortel Susu Mantap',
        imageUrl: '/assets/images/jus-wortel.jpg',
        duration: '15 Minutes',
        calories: '180 Cal',
        ingredients: [
            '2 wortel ukuran sedang',
            '1 cup susu',
            '1 tbsp madu',
            'Es batu secukupnya'
        ],
        tutorial: 'Blender wortel dengan susu dan madu. Tambahkan es batu dan blender kembali hingga halus. Sajikan dingin.'
    };

    // Fungsi untuk menangani klik pada kartu makanan
    const handleCardClick = (food) => {
        setSelectedFood(food);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setSelectedFood(null);
    };

    return (
        <>
            <Navbar />
            
            <div className="makanan-page">
                <div className="makanan-highlight">
                    <h2 className="highlight-title" data-aos="fade-down" data-aos-delay="100">
                        Food Recommendation Of The Day
                    </h2>
                    <div 
                        className="highlight-card" 
                        onClick={() => handleCardClick(highlightFood)}
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        <img src={highlightFood.imageUrl} alt={highlightFood.title} className="highlight-image" />
                        <div className="highlight-info">
                            <h3>{highlightFood.title}</h3>
                            <p>{highlightFood.duration} | {highlightFood.calories}</p>
                        </div>
                    </div>
                </div>
                
                <div className="makanan-grid">
                    {foods.map((food, index) => (
                        <div 
                            className="food-card" 
                            key={index} 
                            onClick={() => handleCardClick(food)}
                            data-aos="fade-up"
                            data-aos-delay={index * 100} // Delay bertahap untuk setiap food-card
                        >
                            <img src={food.imageUrl} alt={food.title} className="food-image" />
                            <h3 className="food-title">{food.title}</h3>
                            <p className="food-info">{food.duration} | {food.calories}</p>
                        </div>
                    ))}
                </div>

                {selectedFood && <FoodDetailModal food={selectedFood} onClose={closeModal} />}
            </div>
        </>
    );
};

export default Makanan;
