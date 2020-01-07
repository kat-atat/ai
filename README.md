<h1><p align="center"><img src="./ia.png" alt="いあ" height="200"></p></h1>
<p align="center">An Ai(iA) for Misskey. <a href="./torisetu.md">About Ai(iA)</a></p>

**※In this repository, Ai is basically called iA.**

## これなに
Misskey用の日本語Botです。

当リポジトリではめいめいリポジトリ(=改造バージョン)から更に改造してます。

藍ではなくいあと呼んであげて下さい。

## どこ改造した？

･そもそもフォーク元がオリジナルではなくめいめい(@mei23)による改造バージョン。(通称いあ)

･セリフを敬語調から変更(完全に趣味｡統一性があるかは謎｡)

･起動時に投稿するモジュールを追加(あれが正解とは思えないのでTypeScript得意な人は修正案を頼みます)

･○○頂戴(下さい,欲しい,欲しいな)とリプライすると○○どうぞと返信してくれるプログラム(オウム返しプログラム。天気機能作ろうとした残骸。変数関係が訳わからなかったので試してた。)

･このプログラムではないが同じアカウントで使う前提のPHPプログラムが[私の別リポジトリ](https://github.com/Leies-202/mis-php-list)にあります。

･フォーク元であるめいめいのリポジトリでは何が改造されてるかについては[こちらの取説の下部](https://github.com/Leies-202/ai/blob/myia/torisetu.md)をご確認下さい。
## インストール
> Node.js と npm と MeCab (オプション) がインストールされている必要があります。

まず適当なディレクトリに `git clone` します。
次にそのディレクトリに `config.json` を作成します。中身は次のようにします:
``` json
{
	"host": "https:// + あなたのインスタンスのURL (末尾の / は除く)",
	"i": "いあとして動かしたいアカウントのAPIキー",
	"keywordEnabled": "キーワードを覚える機能 (MeCab が必要) を有効にする場合は true を入れる (無効にする場合は false)",
	"chartEnabled": "チャート機能を無効化する場合は false を入れてください",
	"reversiEnabled": "いあとリバーシで対局できる機能を有効にする場合は true を入れる (無効にする場合は false)",
	"serverMonitoring": "サーバー監視の機能を有効にする場合は true を入れる (無効にする場合は false)",
	"mecab": "MeCab のインストールパス (ソースからインストールした場合、大体は /usr/local/bin/mecab)"
}
```
`npm install` して `npm run build` して `npm start` すれば起動できます

時々MeCabの場所が`/usr/bin/mecab`の場合ある。(自分の場合これ)

## フォント
一部の機能にはフォントが必要です。いあにはフォントは同梱されていないので、ご自身でフォントをインストールディレクトリに`font.ttf`という名前で設置してください。

## 記憶
いあは記憶の保持にインメモリデータベースを使用しており、いあのインストールディレクトリに `memory.json` という名前で永続化されます。

## ライセンス
MIT

## Awards
<img src="./WorksOnMyMachine.png" alt="Works on my machine" height="120">
