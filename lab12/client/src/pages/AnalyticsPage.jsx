import { useEffect, useRef, useState } from 'react';

const API = import.meta.env.VITE_API_URL || '/api';

export default function AnalyticsPage() {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API}/analytics/summary`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const json = await response.json();
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!data || !chartRef.current) return undefined;

    let disposed = false;

    async function renderChart() {
      const Plotly = (await import('plotly.js-dist-min')).default;

      if (disposed || !chartRef.current) return;

      const plotData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Средняя цена',
          x: data.categories,
          y: data.avgPrices,
          line: { color: '#0f766e', width: 3, shape: 'spline' },
          marker: { size: 10, color: '#f59e0b' },
          hovertemplate:
            '<b>%{x}</b><br>Средняя цена: %{y:.2f} Br<br><extra></extra>',
        },
      ];

      const layout = {
        title: {
          text: data.title || 'Средняя цена по категориям',
          font: { size: 18, color: '#0f172a' },
        },
        xaxis: {
          title: 'Категория',
          tickangle: -15,
        },
        yaxis: {
          title: 'Средняя цена, Br',
          zeroline: false,
        },
        margin: { t: 60, r: 24, b: 80, l: 60 },
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#f8fafc',
        hovermode: 'closest',
        showlegend: false,
      };

      await Plotly.newPlot(chartRef.current, plotData, layout, {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
      });
    }

    renderChart().catch((err) => setError(err.message));

    return () => {
      disposed = true;
      if (chartRef.current) {
        import('plotly.js-dist-min')
          .then((mod) => mod.default.purge(chartRef.current))
          .catch(() => {});
      }
    };
  }, [data]);

  return (
    <main>
      <h1>Аналитика цен DigiVault</h1>
      <p className="lead">
        Линейный график (Line Chart) средней цены товаров по категориям. Данные
        агрегируются на бэкенде через MongoDB <code>aggregate</code> и
        отдаются эндпоинтом <code>GET /api/analytics/summary</code>.
      </p>

      {loading && <p className="status">Загрузка аналитики…</p>}
      {error && <p className="error">Ошибка: {error}</p>}

      {data && (
        <>
          <div className="meta" aria-label="Сводка">
            {data.series.map((row) => (
              <span key={row.category} className="chip">
                {row.category}: {row.avgPrice.toFixed(2)} Br ({row.productCount})
              </span>
            ))}
          </div>

          <section className="card chart-wrap" data-testid="analytics-chart">
            <div ref={chartRef} style={{ width: '100%', height: '420px' }} />
          </section>
        </>
      )}
    </main>
  );
}
