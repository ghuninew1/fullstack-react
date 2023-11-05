export function triggerTooltip(chart) {
    const tooltip = chart?.tooltip;

    if (!tooltip) {
        return;
    }

    if (tooltip.getActiveElements().length > 0) {
        tooltip.setActiveElements([], { x: 0, y: 0 });
    } else {
        const { chartArea } = chart;

        tooltip.setActiveElements(
            [
                {
                    datasetIndex: 0,
                    index: 2,
                },
                {
                    datasetIndex: 1,
                    index: 2,
                },
            ],
            {
                x: (chartArea.left + chartArea.right) / 2,
                y: (chartArea.top + chartArea.bottom) / 2,
            }
        );
    }

    chart.update();
}

