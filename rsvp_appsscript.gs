/**
 * 참석여부(RSVP)를 구글 시트에 저장하는 Google Apps Script 웹앱
 *
 * 사용법:
 *  1) 연동할 구글 시트 열기 → 상단 메뉴 [확장 프로그램] → [Apps Script]
 *  2) 기본 코드를 지우고 이 파일 내용을 통째로 붙여넣기 → 저장(💾)
 *  3) 우측 상단 [배포] → [새 배포] → 유형: '웹 앱'
 *       - 실행 주체(Execute as): 나(본인 계정)
 *       - 액세스 권한(Who has access): '모든 사용자(Anyone)'
 *     → [배포] → 권한 승인(본인 구글 계정)
 *  4) 나오는 웹 앱 URL ( https://script.google.com/macros/s/........./exec ) 복사해서 전달
 *
 * 코드를 수정해 재배포할 때는 [배포] → [배포 관리] → 연필(편집) → 버전 '새 버전' → 배포
 * (그래야 변경분이 반영됩니다. URL은 그대로 유지됩니다.)
 */

var SHEET_ID = '1eVMkEFlTJ8iLqsgAEoEk72Mhf1fT9VnCp7kBMHPP_jI';
var SHEET_NAME = '참석여부';

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(['제출시각', '구분', '성함', '참석인원']);
    }
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    sh.appendRow([new Date(), data.side || '', data.name || '', data.count || '']);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('RSVP endpoint is running.');
}
