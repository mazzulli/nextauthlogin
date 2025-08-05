import CheckoutButton from "../_components/checkout-button";

type PlanProps = {
    searchParams: string;
};

const Plans = ({searchParams}: PlanProps) => {
    console.log("Search Params:", searchParams);
    const monthlyPrice = process.env.STRIPE_MONTHLY_PRICE_ID!
    const semestralPrice = process.env.STRIPE_SEMESTRAL_PRICE_ID!
    const anualPrice = process.env.STRIPE_ANUAL_PRICE_ID!
    return ( 
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Planos</h1>
            <p className="text-lg mb-8">Escolha o plano que melhor se adapta às suas necessidades.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Aqui você pode adicionar os planos disponíveis */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Plano Mensal</h2>
                    <p className="text-gray-600 mb-4">R$ 19,90 por mês</p>
                    <CheckoutButton priceId={monthlyPrice}>Assinar</CheckoutButton>
                </div>    
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Plano Semestral</h2>
                    <p className="text-gray-600 mb-4">R$ 107,90 por semestre</p>
                    <CheckoutButton priceId={semestralPrice}>Assinar</CheckoutButton>
                </div>    
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Plano Anual</h2>
                    <p className="text-gray-600 mb-4">R$ 238,90 por ano</p>
                    <CheckoutButton priceId={anualPrice}>Assinar</CheckoutButton>
                </div>    
            </div>
        </div>
     );
}
 
export default Plans;