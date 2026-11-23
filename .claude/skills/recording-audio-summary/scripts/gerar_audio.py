#!/usr/bin/env python3
"""Gera o resumo.mp3 de uma edição d'A Banca pela API do ElevenLabs.

Lê a narração do roteiro (tudo depois do separador ---), confere o teto de
caracteres e grava o MP3 no caminho de saída. Na nuvem, a chave é um segredo do
ambiente que injeta o cabeçalho xi-api-key; localmente, use ELEVENLABS_API_KEY.
Nunca passe a chave por argumento, arquivo do repo ou log.

Uso:
  python gerar_audio.py <roteiro.md> <saida.mp3> [--voz VOICE_ID] [--ensaio]

--ensaio gera só uma frase curta (~60 caracteres) para testar chave, rede e
voz sem gastar o orçamento da semana.

Códigos de saída: 0 ok · 2 chave ausente ou inválida (401) · 3 roteiro acima do teto · 4 erro da API
"""
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

VOZ_PADRAO = "dX7gRq1dIvLTgUaWpEFn"  # Rafael Valente (voz provisória desde 12/10/2026)
MODELO = "eleven_multilingual_v2"
TETO = 900  # ver "Regra de prioridade" em jornal/creditos-elevenlabs.md
FRASE_ENSAIO = "Teste da rotina d'A Banca. Se você ouve isto, o áudio está funcionando."


def narracao(texto):
    partes = texto.split("\n---\n", 1)
    return (partes[1] if len(partes) == 2 else texto).strip()


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    ensaio = "--ensaio" in sys.argv
    voz = VOZ_PADRAO
    if "--voz" in sys.argv:
        voz = sys.argv[sys.argv.index("--voz") + 1]
        args = [a for a in args if a != voz]
    if len(args) != 2:
        print(__doc__)
        return 1

    # Na nuvem, a chave fica num segredo do ambiente que injeta o cabeçalho xi-api-key
    # nas chamadas a api.elevenlabs.io: o script não vê o valor e não precisa dele.
    # Localmente, ELEVENLABS_API_KEY ainda funciona.
    chave = os.environ.get("ELEVENLABS_API_KEY", "").strip()

    roteiro, saida = Path(args[0]), Path(args[1])
    texto = FRASE_ENSAIO if ensaio else narracao(roteiro.read_text(encoding="utf-8"))
    if len(texto) > TETO:
        print(f"ERRO: narração com {len(texto)} caracteres, acima do teto de {TETO}. Corte o roteiro.")
        return 3

    cabecalhos = {"Content-Type": "application/json", "Accept": "audio/mpeg"}
    if chave:
        cabecalhos["xi-api-key"] = chave
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voz}?output_format=mp3_44100_128",
        data=json.dumps({"text": texto, "model_id": MODELO}).encode("utf-8"),
        headers=cabecalhos,
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            dados = r.read()
            custo = r.headers.get("x-character-count") or r.headers.get("character-cost")
    except urllib.error.HTTPError as e:
        corpo = e.read().decode("utf-8", "replace")[:500]
        print(f"ERRO da API ElevenLabs: HTTP {e.code} — {corpo}")
        if e.code == 401:
            print("Sem chave válida: confira o segredo do ambiente (cabeçalho xi-api-key, site api.elevenlabs.io).")
            return 2
        return 4
    except urllib.error.URLError as e:
        print(f"ERRO de rede ao chamar api.elevenlabs.io: {e.reason} (o ambiente libera esse domínio?)")
        return 4

    if len(dados) < 1000:
        print(f"ERRO: resposta pequena demais ({len(dados)} bytes) para ser um MP3.")
        return 4
    saida.parent.mkdir(parents=True, exist_ok=True)
    saida.write_bytes(dados)
    segundos = len(dados) * 8 / 128000
    print(f"OK: {saida} · {len(texto)} caracteres · {len(dados)} bytes · ~{segundos:.0f}s"
          + (f" · custo informado pela API: {custo}" if custo else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
