import { useEffect, useState } from 'react';
import './CategoriesSelector.css';

type CategoriesSelectorProps = {
    categories: Category[]
    handleClose: (data: Category[]) => void
    previouslySelectedCategories: string[] | undefined
}

export default function CategoriesSelector({ categories, handleClose, previouslySelectedCategories }: CategoriesSelectorProps) {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [hasExecuted, setHasExecuted] = useState<boolean>(false);

    const handleCategoryClick = (category: Category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c._id !== category._id));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    useEffect(() => {
        if (!hasExecuted) {

            if (previouslySelectedCategories) {
                previouslySelectedCategories.forEach(categoryId => {
                    const category = categories.find(c => c._id === categoryId);
                    if (category) {
                        setSelectedCategories([...selectedCategories, category]);
                    }
                });
            }

            setHasExecuted(true);
        }
    }, [previouslySelectedCategories, categories, selectedCategories, hasExecuted]);

    return (
        <div className='z-[60] fixed w-full h-full flex justify-center items-center bg-black bg-opacity-50 top-0 left-0'>
            <div className="flex flex-col gap-4 items-center justify-center bg-white border p-4 rounded-md max-w-[438px] max-h-[780px]">
                <h1 className="text-center">Seleccionar categorías</h1>
                <div className="flex flex-wrap justify-center items-center w-96 min-h-40 gap-2 overflow-y-auto bg-slate-50 shadow-xl rounded-lg">
                    {
                        categories.map((category) => {
                            const selected = selectedCategories.includes(category);

                            return (
                                <div key={category._id} className={`w-fit h-fit flex gap-2 items-center border rounded-full py-2 px-4 cursor-pointer hover:opacity-65 transition-all duration-200 ${selected ? "bg-blue-300" : "bg-white"}`} onClick={() => {
                                    handleCategoryClick(category);
                                }}>
                                    <div className="w-6 h-6 flex justify-center items-center overflow-hidden svg-container" dangerouslySetInnerHTML={{ __html: category.svg_logo as TrustedHTML }}></div>
                                    <p className='text-blue-900 font-bold'>{category.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white" onClick={() => {
                    handleClose(selectedCategories);
                }}>
                    Cerrar
                </button>
            </div>
        </div>
    )

}