// Inicializa tooltips do Bootstrap (para botões de copiar)
document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (el) { return new bootstrap.Tooltip(el); });

    // Copy buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const txt = btn.getAttribute('data-copy') || '';
            try {
                await navigator.clipboard.writeText(txt);
                const original = btn.innerHTML;
                btn.innerText = 'Copiado!';
                btn.classList.add('btn-success');
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.classList.remove('btn-success');
                }, 1400);
            } catch (err) {
                console.error('Erro ao copiar:', err);
                btn.innerText = 'Erro';
                setTimeout(() => {
                    btn.innerText = 'Copiar';
                }, 1400);
            }
        });
    });
});

// Função simples para copiar comando (referenciada no index.html)
function copyCommand(text, btn) {
    if (!navigator.clipboard) {
        // fallback
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        try { document.execCommand('copy'); } catch (err) { /* ignorar */ }
        document.body.removeChild(el);
        // Feedback visual no botão se fornecido
        if (btn && btn.tagName === 'BUTTON') {
            const prev = btn.innerHTML;
            btn.innerHTML = 'Copiado';
            setTimeout(() => btn.innerHTML = prev, 1000);
        } else {
            alert('Comando copiado!');
        }
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        // feedback curto - usa o botão passado como parâmetro ou tenta o event.target
        const original = btn || event?.target;
        // opcional: mudar texto do botão por 1s
        if (original && original.tagName === 'BUTTON') {
            const prev = original.innerHTML;
            original.innerHTML = 'Copiado';
            setTimeout(() => original.innerHTML = prev, 1000);
        }
    }, function(err) {
        alert('Erro ao copiar: ' + err);
    });
}