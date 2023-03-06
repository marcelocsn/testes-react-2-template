import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"


//MOCKs (poderia estar em arquivo separado)
const productMock = {
    id: "1",
    image: "https://image.png",
    title: "Produto teste",
    price: 1000
}

const addToCartMock = jest.fn()

//TESTs
describe("Product Card", () => {
    
    //pratica guiada 1
    test("testar renderizar card de produto", () => {
        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        //opcional
        const card = screen.getByText("Produto teste")
        expect(card).toBeInTheDocument()
    })

    //pratica guiada 2
    test("testar a renderização do titulo, imagem, preço e botão de compra", () => {
        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        const title = screen.getByRole('heading', {name: /produto teste/i})
        const image = screen.getByRole('img', { name: /produto teste/i})
        const price = screen.getByText(/\$1000\.00/i)
        const addBtn = screen.getByRole('button', { name: /buy/i})
        screen.logTestingPlaygroundURL()

        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(addBtn).toBeInTheDocument()
    })

    //pratica guiada 3
    test("testa quando o produto de compra for clicado e chama a função de adicionar ao carrinho", async () => {

        const user = userEvent.setup()
        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        const addBnt = screen.getByRole('button', {name: /buy/i})
        //screen.logTestingPlaygroundURL()

        await user.click(addBnt)

        //como estou utilizando jest.fn() posso utilizar metodos especiais de verificar se a função esta funcionando
        
        //verifica se a função foi chamada
        expect(addToCartMock).toBeCalled()

        //verifica quantas vezes a função foi chamada
        expect(addToCartMock).toBeCalledTimes(1)

        //verifica qual é o argumento assado na função
        expect(addToCartMock).toBeCalledWith(productMock)
    })

})