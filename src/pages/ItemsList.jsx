import ItemCard from '../components/ItemCard'
import { useEffect, useState } from "react"
import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"
import { useItemStore } from "../store/useItemStore"

const ItemsList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {items, getItems} = useItemStore()
    const [stats, setStats] = useState(null)
    useEffect(() => {
        const load = async () => {
            setError(null)
            setIsLoading(true)
            setStats(null)
            try{
            await getItems()
        } catch (error) {
            console.error(error)
            setError(error.item)
        } finally {
            setIsLoading(false)
        }
    }

    const loadStats = async () => {
        try { 
            const response = await api.getStats()
            setStats(response.data);
        } catch (error) {
            console.error(error)
        }
    }
    loadStats()
    load()
    }, [])
    return (
        <div className="container">
            <div class="page-header">
                <h1>Все товары</h1>
            </div>
            {stats && (
            <div class="stats">
                <div class="stat-item">
                        <span class="stat-value">{stats.totalItems}</span>
                    <span class="stat-label">Товаров</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats.totalBids}</span>
                    <span class="stat-label">Ставок</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats.activeItems}</span>
                    <span class="stat-label">Активных</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats.averageItemPrice} ₽</span>
                    <span class="stat-label">Средняя цена</span>
                </div>
            </div>
    )}

            <div class="items-grid">
                   {items.map((item, i) => (
                            <ItemCard key={i} {...item} />
                        ))}
            </div>
        </div>
    )
}

export default ItemsList
