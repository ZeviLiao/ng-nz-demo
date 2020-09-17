import { Injectable } from '@angular/core';
const userData = {
  email: 'zeviliao@gmail.com',
  areaCode: null,
  phoneNumber: null,
  givenName: 'Z',
  familyName: 'L',
  location: 'TW',
  type: 'normal',
  provider: 'newNuwa',
  identities: [
    {
      provider: 'wechat',
      userId: 'oNf8w0v6mXXjUk9qrU0BYsZK-SWM',
      openId: 'oqox10wATgkwNGnwH8-5GrJBNpEI',
      isSocial: 'true',
      // tslint:disable-next-line:max-line-length
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/SNRbGMBjbcrCf1MO7XaeTUNOY5CUoVU5WbX3HkB6ibtRoPXVwSMmeQCJPpv1IapO7EIknua6mmwJhaJyu2PH6Lg/132'
    }
  ],
  userId: '177160733799',
  name: 'Z L',
  firstTimeLogin: false,
  team: [
    {
      teamId: 'NB1561607338019',
      name: 'NB1561607338019',
      isOwner: true,
      isRmsScope: false,
      type: 'normal',
      scope: [
        {
          _id: '5d00aea23d18fd3591413ace',
          name: 'codeLab',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-codelab.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-d-codelab.svg',
          categoryName: 'robot-tool',
          categoryI18n: [
            {
              title: '機器人工具',
              langCode: 'zh-TW'
            },
            {
              title: '机器人工具',
              langCode: 'zh-CN'
            },
            {
              title: 'My Tools',
              langCode: 'en-US'
            },
            {
              title: 'ロボット道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-codelab.nuwarobotics.com/koding',
          i18n: [
            {
              title: '程式實驗室',
              langCode: 'zh-TW'
            },
            {
              title: '编程实验室',
              langCode: 'zh-CN'
            },
            {
              title: 'Code Lab',
              langCode: 'en-US'
            },
            {
              title: 'プログラミング実験室',
              langCode: 'ja-JP'
            }
          ]
        },
        {
          _id: '5f191e996f8b2fb988fe4257',
          name: 'brain',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-quizkit-light.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-quizkit-dark.svg',
          categoryName: 'robot-tool',
          categoryI18n: [
            {
              title: '機器人工具',
              langCode: 'zh-TW'
            },
            {
              title: '机器人工具',
              langCode: 'zh-CN'
            },
            {
              title: 'My Tools',
              langCode: 'en-US'
            },
            {
              title: 'ロボット道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-biztool-brainwar.nuwarobotics.com/',
          i18n: [
            {
              title: '題庫製造機',
              langCode: 'zh-TW'
            },
            {
              title: '题库制造机',
              langCode: 'zh-CN'
            },
            {
              title: 'QuizDash',
              langCode: 'en-US'
            },
            {
              title: 'QuizDash',
              langCode: 'ja-JP'
            },
            {
              title: '퀴즈 퐁퐁',
              langCode: 'ko-KR'
            }
          ],
          forceDisplay: true
        }
      ],
      program: 'user',
      roleI18n: [
        {
          title: '家庭使用者',
          langCode: 'zh-TW'
        },
        {
          title: '家庭使用者',
          langCode: 'zh-CN'
        },
        {
          title: 'User',
          langCode: 'en-US'
        },
        {
          title: 'ユーザー',
          langCode: 'ja-JP'
        }
      ],
      endDate: '2059-05-22T09:23:10.377Z'
    },
    {
      teamId: 'NB1557903870927',
      name: 'NB1557903870928',
      isOwner: false,
      isRmsScope: true,
      type: 'owner',
      scope: [
        {
          _id: '5d00ae7e3d18fd3591413acd',
          name: 'rms_user',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-rms.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-d-rms.svg',
          categoryName: 'manage-tool',
          categoryI18n: [
            {
              title: '管理工具',
              langCode: 'zh-TW'
            },
            {
              title: '管理工具',
              langCode: 'zh-CN'
            },
            {
              title: 'Management Tools',
              langCode: 'en-US'
            },
            {
              title: '管理道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-rms.nuwarobotics.com/dashboard',
          i18n: [
            {
              title: '機器人管理系統',
              langCode: 'zh-TW'
            },
            {
              title: '机器人管理系统',
              langCode: 'zh-CN'
            },
            {
              title: 'Robot Management System',
              langCode: 'en-US'
            },
            {
              title: ' ロボット管理',
              langCode: 'ja-JP'
            }
          ]
        },
        {
          _id: '5f191e996f8b2fb988fe4257',
          name: 'brain',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-quizkit-light.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-quizkit-dark.svg',
          categoryName: 'robot-tool',
          categoryI18n: [
            {
              title: '機器人工具',
              langCode: 'zh-TW'
            },
            {
              title: '机器人工具',
              langCode: 'zh-CN'
            },
            {
              title: 'My Tools',
              langCode: 'en-US'
            },
            {
              title: 'ロボット道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-biztool-brainwar.nuwarobotics.com/',
          i18n: [
            {
              title: '題庫製造機',
              langCode: 'zh-TW'
            },
            {
              title: '题库制造机',
              langCode: 'zh-CN'
            },
            {
              title: 'QuizDash',
              langCode: 'en-US'
            },
            {
              title: 'QuizDash',
              langCode: 'ja-JP'
            },
            {
              title: '퀴즈 퐁퐁',
              langCode: 'ko-KR'
            }
          ],
          forceDisplay: true
        }
      ],
      program: 'education',
      roleI18n: [
        {
          title: '教育單位',
          langCode: 'zh-TW'
        },
        {
          title: '教育单位',
          langCode: 'zh-CN'
        },
        {
          title: 'Educational Institution',
          langCode: 'en-US'
        },
        {
          title: '教育機構',
          langCode: 'ja-JP'
        }
      ],
      endDate: '2059-05-22T09:23:10.377Z'
    },
    {
      teamId: 'NB1563766484392',
      name: 'NB1563766484392',
      isOwner: false,
      isRmsScope: true,
      type: 'member',
      scope: [
        {
          _id: '5d00ae7e3d18fd3591413acd',
          name: 'rms_user',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-rms.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-d-rms.svg',
          categoryName: 'manage-tool',
          categoryI18n: [
            {
              title: '管理工具',
              langCode: 'zh-TW'
            },
            {
              title: '管理工具',
              langCode: 'zh-CN'
            },
            {
              title: 'Management Tools',
              langCode: 'en-US'
            },
            {
              title: '管理道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-rms.nuwarobotics.com/dashboard',
          i18n: [
            {
              title: '機器人管理系統',
              langCode: 'zh-TW'
            },
            {
              title: '机器人管理系统',
              langCode: 'zh-CN'
            },
            {
              title: 'Robot Management System',
              langCode: 'en-US'
            },
            {
              title: ' ロボット管理',
              langCode: 'ja-JP'
            }
          ]
        },
        {
          _id: '5d00aea23d18fd3591413ace',
          name: 'codeLab',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-codelab.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-d-codelab.svg',
          categoryName: 'robot-tool',
          categoryI18n: [
            {
              title: '機器人工具',
              langCode: 'zh-TW'
            },
            {
              title: '机器人工具',
              langCode: 'zh-CN'
            },
            {
              title: 'My Tools',
              langCode: 'en-US'
            },
            {
              title: 'ロボット道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-codelab.nuwarobotics.com/koding',
          i18n: [
            {
              title: '程式實驗室',
              langCode: 'zh-TW'
            },
            {
              title: '编程实验室',
              langCode: 'zh-CN'
            },
            {
              title: 'Code Lab',
              langCode: 'en-US'
            },
            {
              title: 'プログラミング実験室',
              langCode: 'ja-JP'
            }
          ]
        },
        {
          _id: '5d00af6e3d18fd3591413acf',
          name: 'contentEditor',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-contenteditor.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-d-contenteditor.svg',
          categoryName: 'robot-tool',
          categoryI18n: [
            {
              title: '機器人工具',
              langCode: 'zh-TW'
            },
            {
              title: '机器人工具',
              langCode: 'zh-CN'
            },
            {
              title: 'My Tools',
              langCode: 'en-US'
            },
            {
              title: 'ロボット道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-biztool-contenteditor.nuwarobotics.com/#/',
          i18n: [
            {
              title: '內容編輯器',
              langCode: 'zh-TW'
            },
            {
              title: '內容編輯器',
              langCode: 'zh-CN'
            },
            {
              title: 'Content Editor',
              langCode: 'en-US'
            },
            {
              title: '内容編集器',
              langCode: 'ja-JP'
            }
          ]
        },
        {
          _id: '5f191e996f8b2fb988fe4257',
          name: 'brain',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-quizkit-light.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-quizkit-dark.svg',
          categoryName: 'robot-tool',
          categoryI18n: [
            {
              title: '機器人工具',
              langCode: 'zh-TW'
            },
            {
              title: '机器人工具',
              langCode: 'zh-CN'
            },
            {
              title: 'My Tools',
              langCode: 'en-US'
            },
            {
              title: 'ロボット道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-biztool-brainwar.nuwarobotics.com/',
          i18n: [
            {
              title: '題庫製造機',
              langCode: 'zh-TW'
            },
            {
              title: '题库制造机',
              langCode: 'zh-CN'
            },
            {
              title: 'QuizDash',
              langCode: 'en-US'
            },
            {
              title: 'QuizDash',
              langCode: 'ja-JP'
            },
            {
              title: '퀴즈 퐁퐁',
              langCode: 'ko-KR'
            }
          ],
          forceDisplay: true
        }
      ],
      program: 'user',
      roleI18n: [
        {
          title: '家庭使用者',
          langCode: 'zh-TW'
        },
        {
          title: '家庭使用者',
          langCode: 'zh-CN'
        },
        {
          title: 'User',
          langCode: 'en-US'
        },
        {
          title: 'ユーザー',
          langCode: 'ja-JP'
        }
      ],
      endDate: '2059-05-22T09:23:10.377Z'
    },
    {
      teamId: 'NB1565172488294',
      name: 'NB1565172488294',
      isOwner: false,
      isRmsScope: true,
      type: 'normal',
      scope: [
        {
          _id: '5d00ae7e3d18fd3591413acd',
          name: 'rms_user',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-rms.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-d-rms.svg',
          categoryName: 'manage-tool',
          categoryI18n: [
            {
              title: '管理工具',
              langCode: 'zh-TW'
            },
            {
              title: '管理工具',
              langCode: 'zh-CN'
            },
            {
              title: 'Management Tools',
              langCode: 'en-US'
            },
            {
              title: '管理道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-rms.nuwarobotics.com/dashboard',
          i18n: [
            {
              title: '機器人管理系統',
              langCode: 'zh-TW'
            },
            {
              title: '机器人管理系统',
              langCode: 'zh-CN'
            },
            {
              title: 'Robot Management System',
              langCode: 'en-US'
            },
            {
              title: ' ロボット管理',
              langCode: 'ja-JP'
            }
          ]
        },
        {
          _id: '5d00aea23d18fd3591413ace',
          name: 'codeLab',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-codelab.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-d-codelab.svg',
          categoryName: 'robot-tool',
          categoryI18n: [
            {
              title: '機器人工具',
              langCode: 'zh-TW'
            },
            {
              title: '机器人工具',
              langCode: 'zh-CN'
            },
            {
              title: 'My Tools',
              langCode: 'en-US'
            },
            {
              title: 'ロボット道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-codelab.nuwarobotics.com/koding',
          i18n: [
            {
              title: '程式實驗室',
              langCode: 'zh-TW'
            },
            {
              title: '编程实验室',
              langCode: 'zh-CN'
            },
            {
              title: 'Code Lab',
              langCode: 'en-US'
            },
            {
              title: 'プログラミング実験室',
              langCode: 'ja-JP'
            }
          ]
        },
        {
          _id: '5f191e996f8b2fb988fe4257',
          name: 'brain',
          imgUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-quizkit-light.svg',
          darkImageUrl: 'https://dev-file.nuwarobotics.com/nuwa-statics-mirror/gra-my-tools-quizkit-dark.svg',
          categoryName: 'robot-tool',
          categoryI18n: [
            {
              title: '機器人工具',
              langCode: 'zh-TW'
            },
            {
              title: '机器人工具',
              langCode: 'zh-CN'
            },
            {
              title: 'My Tools',
              langCode: 'en-US'
            },
            {
              title: 'ロボット道具',
              langCode: 'ja-JP'
            }
          ],
          link: 'https://dev-biztool-brainwar.nuwarobotics.com/',
          i18n: [
            {
              title: '題庫製造機',
              langCode: 'zh-TW'
            },
            {
              title: '题库制造机',
              langCode: 'zh-CN'
            },
            {
              title: 'QuizDash',
              langCode: 'en-US'
            },
            {
              title: 'QuizDash',
              langCode: 'ja-JP'
            },
            {
              title: '퀴즈 퐁퐁',
              langCode: 'ko-KR'
            }
          ],
          forceDisplay: true
        }
      ],
      program: 'steam',
      roleI18n: [
        {
          title: 'STEAM 教育',
          langCode: 'zh-TW'
        },
        {
          title: 'STEAM 教育',
          langCode: 'zh-CN'
        },
        {
          title: 'STEAM',
          langCode: 'en-US'
        },
        {
          title: 'STEAM教育',
          langCode: 'ja-JP'
        }
      ],
      endDate: '2059-05-22T09:23:10.377Z'
    }
  ],
  hasOwner: true,
  missionKeys: [],
  simulatorKeys: [],
  trialTeam: []
};

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  constructor() { }

  getUserData() {
    return userData;
  }
  getTeamList() {
    return userData.team;
  }
  getToolListByTeamId(teamId = 'NB1563766484392') {
    return userData.team
      .filter(t => t.teamId === teamId)[0]
      .scope;
  }

}
