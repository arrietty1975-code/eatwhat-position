// 应用主类
class MealApp {
  constructor() {
    // 日期和状态
    this.currentDate = this.formatDate(new Date());
    
    // 用户位置
    this.userLocation = null;
    this.locationStatus = '定位中...';
    
    // 三餐随机相关 - 改为商家数据
    this.breakfastRolling = false;
    this.breakfastRestaurant = null;
    this.breakfastRestaurants = [];
    this.breakfastInterval = null;
    
    this.lunchRolling = false;
    this.lunchRestaurant = null;
    this.lunchRestaurants = [];
    this.lunchInterval = null;
    
    this.dinnerRolling = false;
    this.dinnerRestaurant = null;
    this.dinnerRestaurants = [];
    this.dinnerInterval = null;
    
    // 所有商家数据（模拟数据）
    this.allRestaurants = this.initRestaurantData();

    // 基础配置
    this.mealTypes = ['早餐', '午餐', '晚餐'];
    this.selectedMealType = '';
    this.tags = ['轻食', '火锅', '快餐', '家常菜', '甜品', '面食', '米饭', '小吃'];
    this.selectedTag = '';
    this.isAllSelected = true;
    
    // 食物列表
    this.foods = [
      { id: 1, name: '全麦三明治', lastEatDate: '2026-02-25', mealType: '早餐', tags: ['轻食'] },
      { id: 2, name: '番茄肥牛火锅', lastEatDate: '2026-02-27', mealType: '晚餐', tags: ['火锅'] },
      { id: 3, name: '鸡胸肉沙拉', lastEatDate: '2026-02-26', mealType: '午餐', tags: ['轻食'] },
      { id: 4, name: '牛肉汉堡', lastEatDate: '2026-02-24', mealType: '午餐', tags: ['快餐'] },
      { id: 5, name: '芒果班戟', lastEatDate: '2026-02-23', mealType: '晚餐', tags: ['甜品'] },
      { id: 6, name: '香菇青菜粥', lastEatDate: '2026-02-28', mealType: '早餐', tags: ['家常菜'] }
    ];
    this.filteredFoods = [];
    
    // 弹窗相关
    this.showModal = false;
    this.isEditMode = false;
    this.editFoodId = '';
    this.inputFoodName = '';
    this.checkedTags = [];
    this.recommendFoods = ['照烧鸡腿饭', '菌菇汤面', '紫薯芋泥甜品', '香煎三文鱼'];
    this.customTagInput = '';
    
    // 删除确认弹窗
    this.showDeleteModal = false;
    this.deleteFoodId = '';
    
    // 标签删除确认弹窗
    this.showTagDeleteModal = false;
    this.deleteTag = '';
    
    // 随机时长配置
    this.rollDuration = 2000;
    this.defaultEmptyText = '未选择';

    // 初始化
    this.init();
  }

  // 初始化商家数据（模拟数据）
  initRestaurantData() {
    return [
      // 早餐商家
      { id: 1, name: '永和大王', mealType: '早餐', dishes: ['豆浆油条', '全麦三明治', '鸡蛋灌饼'], 
        address: '北京市朝阳区建国路88号', distance: 0.5, rating: 4.5, 
        coupon: '满20减5，新用户立减10元', lat: 39.9042, lng: 116.4074 },
      { id: 2, name: '肯德基早餐', mealType: '早餐', dishes: ['皮蛋瘦肉粥', '豆浆', '油条'], 
        address: '北京市朝阳区建国路90号', distance: 0.8, rating: 4.3, 
        coupon: '早餐套餐8折，限时优惠', lat: 39.9050, lng: 116.4080 },
      { id: 3, name: '麦当劳', mealType: '早餐', dishes: ['麦满分', '咖啡', '薯饼'], 
        address: '北京市朝阳区建国路92号', distance: 1.2, rating: 4.4, 
        coupon: '早餐买一送一，限时活动', lat: 39.9060, lng: 116.4090 },
      { id: 4, name: '星巴克', mealType: '早餐', dishes: ['拿铁', '三明治', '可颂'], 
        address: '北京市朝阳区建国路94号', distance: 1.5, rating: 4.6, 
        coupon: '会员日8折，积分翻倍', lat: 39.9070, lng: 116.4100 },
      { id: 5, name: '包子铺', mealType: '早餐', dishes: ['肉包子', '豆浆', '小米粥'], 
        address: '北京市朝阳区建国路96号', distance: 0.3, rating: 4.2, 
        coupon: '买5送1，满10减2', lat: 39.9030, lng: 116.4060 },
      
      // 午餐商家
      { id: 6, name: '海底捞火锅', mealType: '午餐', dishes: ['番茄肥牛火锅', '毛肚', '虾滑'], 
        address: '北京市朝阳区建国路100号', distance: 0.6, rating: 4.8, 
        coupon: '午市套餐7折，学生证8折', lat: 39.9045, lng: 116.4078 },
      { id: 7, name: '外婆家', mealType: '午餐', dishes: ['青椒肉丝', '麻婆豆腐', '糖醋里脊'], 
        address: '北京市朝阳区建国路102号', distance: 0.9, rating: 4.5, 
        coupon: '满100减20，新用户送饮料', lat: 39.9055, lng: 116.4085 },
      { id: 8, name: '西贝莜面村', mealType: '午餐', dishes: ['莜面', '羊肉串', '凉皮'], 
        address: '北京市朝阳区建国路104号', distance: 1.1, rating: 4.4, 
        coupon: '工作日午餐8折优惠', lat: 39.9065, lng: 116.4095 },
      { id: 9, name: '真功夫', mealType: '午餐', dishes: ['蒸蛋', '排骨饭', '汤'], 
        address: '北京市朝阳区建国路106号', distance: 0.7, rating: 4.3, 
        coupon: '套餐立减5元，会员专享', lat: 39.9048, lng: 116.4082 },
      { id: 10, name: '黄焖鸡米饭', mealType: '午餐', dishes: ['黄焖鸡', '米饭', '小菜'], 
        address: '北京市朝阳区建国路108号', distance: 0.4, rating: 4.1, 
        coupon: '满25减5，加饭免费', lat: 39.9035, lng: 116.4065 },
      { id: 11, name: '兰州拉面', mealType: '午餐', dishes: ['牛肉拉面', '凉菜', '羊肉串'], 
        address: '北京市朝阳区建国路110号', distance: 0.5, rating: 4.2, 
        coupon: '拉面买一送一，限时活动', lat: 39.9040, lng: 116.4070 },
      
      // 晚餐商家
      { id: 12, name: '呷哺呷哺', mealType: '晚餐', dishes: ['小火锅', '肥牛', '蔬菜拼盘'], 
        address: '北京市朝阳区建国路112号', distance: 0.8, rating: 4.5, 
        coupon: '晚市套餐8折，双人餐优惠', lat: 39.9052, lng: 116.4088 },
      { id: 13, name: '绿茶餐厅', mealType: '晚餐', dishes: ['烤鸡', '面包诱惑', '石锅豆腐'], 
        address: '北京市朝阳区建国路114号', distance: 1.0, rating: 4.6, 
        coupon: '满200减50，生日优惠', lat: 39.9060, lng: 116.4092 },
      { id: 14, name: '大龙燚火锅', mealType: '晚餐', dishes: ['麻辣火锅', '毛肚', '鸭血'], 
        address: '北京市朝阳区建国路116号', distance: 1.3, rating: 4.7, 
        coupon: '晚市9折，会员专享', lat: 39.9072, lng: 116.4102 },
      { id: 15, name: '必胜客', mealType: '晚餐', dishes: ['披萨', '意面', '鸡翅'], 
        address: '北京市朝阳区建国路118号', distance: 1.1, rating: 4.4, 
        coupon: '披萨买一送一，限时优惠', lat: 39.9065, lng: 116.4098 },
      { id: 16, name: '探鱼', mealType: '晚餐', dishes: ['烤鱼', '配菜', '饮料'], 
        address: '北京市朝阳区建国路120号', distance: 0.9, rating: 4.5, 
        coupon: '烤鱼8折，配菜免费', lat: 39.9058, lng: 116.4090 },
      { id: 17, name: '小龙坎火锅', mealType: '晚餐', dishes: ['牛油火锅', '牛肉', '虾滑'], 
        address: '北京市朝阳区建国路122号', distance: 1.4, rating: 4.6, 
        coupon: '晚市套餐7.5折优惠', lat: 39.9075, lng: 116.4105 }
    ];
  }

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
  }

  // 显示提示（替代wx.showToast）
  showToast(message, type = 'success') {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${type === 'success' ? '#4a90e2' : '#333'};
      color: #fff;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 1500);
  }

  // 初始化
  init() {
    this.filteredFoods = [...this.foods];
    this.updateCurrentDate();
    this.renderFoodList();
    this.renderTags();
    this.renderRecommendList();
    this.bindEvents();
    this.loadFromLocalStorage();
    // 获取地理位置
    this.getUserLocation();
  }

  // 获取用户地理位置
  getUserLocation() {
    const locationStatus = document.getElementById('locationStatus');
    const locationTip = document.getElementById('locationTip');
    const locationText = document.getElementById('locationText');
    
    if (!navigator.geolocation) {
      this.locationStatus = '定位不支持';
      if (locationStatus) locationStatus.textContent = '定位不支持';
      if (locationText) locationText.textContent = '您的浏览器不支持定位功能，将使用默认位置';
      if (locationTip) locationTip.style.display = 'block';
      // 使用默认位置（北京）
      this.userLocation = { lat: 39.9042, lng: 116.4074 };
      this.filterNearbyRestaurants();
      return;
    }

    this.locationStatus = '定位中...';
    if (locationStatus) locationStatus.textContent = '定位中...';
    if (locationText) locationText.textContent = '正在获取您的位置...';
    if (locationTip) locationTip.style.display = 'block';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.locationStatus = '定位成功';
        if (locationStatus) locationStatus.textContent = '定位成功';
        if (locationText) locationText.textContent = `位置：${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        if (locationTip) locationTip.style.display = 'block';
        this.filterNearbyRestaurants();
      },
      (error) => {
        console.error('定位失败:', error);
        this.locationStatus = '定位失败';
        if (locationStatus) locationStatus.textContent = '定位失败';
        if (locationText) locationText.textContent = '定位失败，将使用默认位置（北京）';
        if (locationTip) locationTip.style.display = 'block';
        // 使用默认位置（北京）
        this.userLocation = { lat: 39.9042, lng: 116.4074 };
        this.filterNearbyRestaurants();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  // 计算两点间距离（公里）
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 地球半径（公里）
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // 筛选附近商家（5公里内）
  filterNearbyRestaurants() {
    if (!this.userLocation) return;

    const maxDistance = 5; // 最大距离5公里
    
    // 筛选早餐商家
    this.breakfastRestaurants = this.allRestaurants
      .filter(r => r.mealType === '早餐')
      .map(r => ({
        ...r,
        distance: this.calculateDistance(this.userLocation.lat, this.userLocation.lng, r.lat, r.lng)
      }))
      .filter(r => r.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    // 筛选午餐商家
    this.lunchRestaurants = this.allRestaurants
      .filter(r => r.mealType === '午餐')
      .map(r => ({
        ...r,
        distance: this.calculateDistance(this.userLocation.lat, this.userLocation.lng, r.lat, r.lng)
      }))
      .filter(r => r.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    // 筛选晚餐商家
    this.dinnerRestaurants = this.allRestaurants
      .filter(r => r.mealType === '晚餐')
      .map(r => ({
        ...r,
        distance: this.calculateDistance(this.userLocation.lat, this.userLocation.lng, r.lat, r.lng)
      }))
      .filter(r => r.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    // 如果没有找到附近商家，使用所有商家
    if (this.breakfastRestaurants.length === 0) {
      this.breakfastRestaurants = this.allRestaurants.filter(r => r.mealType === '早餐');
    }
    if (this.lunchRestaurants.length === 0) {
      this.lunchRestaurants = this.allRestaurants.filter(r => r.mealType === '午餐');
    }
    if (this.dinnerRestaurants.length === 0) {
      this.dinnerRestaurants = this.allRestaurants.filter(r => r.mealType === '晚餐');
    }
  }

  // 更新当前日期显示
  updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
      dateElement.textContent = this.currentDate;
    }
  }

  // 从本地存储加载数据
  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('mealAppData');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.foods && data.foods.length > 0) {
          this.foods = data.foods;
          this.filteredFoods = [...this.foods];
        }
        if (data.tags && data.tags.length > 0) {
          this.tags = data.tags;
        }
        if (data.breakfastFoodList) this.breakfastFoodList = data.breakfastFoodList;
        if (data.lunchFoodList) this.lunchFoodList = data.lunchFoodList;
        if (data.dinnerFoodList) this.dinnerFoodList = data.dinnerFoodList;
        this.renderFoodList();
        this.renderTags();
      }
    } catch (e) {
      console.error('加载本地数据失败:', e);
    }
  }

  // 保存到本地存储
  saveToLocalStorage() {
    try {
      const data = {
        foods: this.foods,
        tags: this.tags,
        breakfastFoodList: this.breakfastFoodList,
        lunchFoodList: this.lunchFoodList,
        dinnerFoodList: this.dinnerFoodList
      };
      localStorage.setItem('mealAppData', JSON.stringify(data));
    } catch (e) {
      console.error('保存本地数据失败:', e);
    }
  }

  // 绑定事件
  bindEvents() {
    // 一键选择三餐
    document.getElementById('oneKeyChooseAll')?.addEventListener('click', () => this.oneKeyChooseAll());
    
    // 一键清空三餐
    document.getElementById('clearAllMeal')?.addEventListener('click', () => this.clearAllMeal());
    
    // 早餐相关
    document.getElementById('toggleBreakfastRoll')?.addEventListener('click', () => this.toggleBreakfastRoll());
    document.getElementById('clearBreakfast')?.addEventListener('click', () => this.clearBreakfast());
    
    // 午餐相关
    document.getElementById('toggleLunchRoll')?.addEventListener('click', () => this.toggleLunchRoll());
    document.getElementById('clearLunch')?.addEventListener('click', () => this.clearLunch());
    
    // 晚餐相关
    document.getElementById('toggleDinnerRoll')?.addEventListener('click', () => this.toggleDinnerRoll());
    document.getElementById('clearDinner')?.addEventListener('click', () => this.clearDinner());
    
    // 标签选择
    document.getElementById('selectAllTags')?.addEventListener('click', () => this.selectAllTags());
    document.querySelectorAll('.tag-item[data-tag]').forEach(item => {
      item.addEventListener('click', (e) => {
        const tag = e.currentTarget.dataset.tag;
        this.toggleTag(tag);
      });
    });
    
    // 重新定位
    document.getElementById('refreshLocation')?.addEventListener('click', () => this.getUserLocation());
    
    // 添加/编辑弹窗
    document.getElementById('showAddModal')?.addEventListener('click', () => this.showAddModal());
    document.getElementById('hideModal')?.addEventListener('click', () => this.hideModal());
    document.getElementById('modalMask')?.addEventListener('click', () => this.hideModal());
    
    // 三餐分类选择
    document.querySelectorAll('.meal-type-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const type = e.currentTarget.dataset.type;
        this.toggleMealType(type);
      });
    });
    
    // 食物名称输入
    document.getElementById('inputFoodName')?.addEventListener('input', (e) => {
      this.inputFoodName = e.target.value;
    });
    
    // 自定义标签输入
    const customTagInput = document.getElementById('customTagInput');
    if (customTagInput) {
      customTagInput.addEventListener('input', (e) => {
        this.customTagInput = e.target.value.trim();
        const addBtn = document.getElementById('addCustomTagBtn');
        if (addBtn) {
          addBtn.style.display = this.customTagInput ? 'block' : 'none';
        }
      });
      customTagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.addCustomTag();
        }
      });
    }
    
    // 添加自定义标签
    document.getElementById('addCustomTagBtn')?.addEventListener('click', () => this.addCustomTag());
    
    // 提交按钮
    document.getElementById('modalSubmit')?.addEventListener('click', () => {
      if (this.isEditMode) {
        this.updateFood();
      } else {
        this.addFood();
      }
    });
    
    // 删除确认弹窗
    document.getElementById('hideDeleteConfirm')?.addEventListener('click', () => this.hideDeleteConfirm());
    document.getElementById('deleteModalMask')?.addEventListener('click', () => this.hideDeleteConfirm());
    document.getElementById('confirmDelete')?.addEventListener('click', () => this.confirmDelete());
    
    // 标签删除确认弹窗
    document.getElementById('hideTagDeleteConfirm')?.addEventListener('click', () => this.hideTagDeleteConfirm());
    document.getElementById('tagDeleteModalMask')?.addEventListener('click', () => this.hideTagDeleteConfirm());
    document.getElementById('confirmDeleteTag')?.addEventListener('click', () => this.confirmDeleteTag());
  }

  // ========== 三餐随机控制 ==========
  toggleBreakfastRoll() {
    if (this.breakfastRolling) return;
    if (this.breakfastRestaurants.length === 0) {
      this.showToast('附近暂无早餐商家', 'none');
      return;
    }
    
    // 清除之前的定时器（如果有）
    if (this.breakfastInterval) {
      clearInterval(this.breakfastInterval);
      this.breakfastInterval = null;
    }
    
    this.breakfastRolling = true;
    this.updateBreakfastButton();
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.breakfastRestaurants.length);
      this.breakfastRestaurant = this.breakfastRestaurants[randomIndex];
      this.updateBreakfastDisplay();
    }, 100);
    this.breakfastInterval = interval;
    
    setTimeout(() => {
      clearInterval(interval);
      this.breakfastInterval = null;
      // 最终确定一个随机商家
      const finalIndex = Math.floor(Math.random() * this.breakfastRestaurants.length);
      this.breakfastRestaurant = this.breakfastRestaurants[finalIndex];
      this.breakfastRolling = false;
      this.updateBreakfastDisplay();
      this.updateBreakfastButton();
    }, this.rollDuration);
  }

  toggleLunchRoll() {
    if (this.lunchRolling) return;
    if (this.lunchRestaurants.length === 0) {
      this.showToast('附近暂无午餐商家', 'none');
      return;
    }
    
    // 清除之前的定时器（如果有）
    if (this.lunchInterval) {
      clearInterval(this.lunchInterval);
      this.lunchInterval = null;
    }
    
    this.lunchRolling = true;
    this.updateLunchButton();
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.lunchRestaurants.length);
      this.lunchRestaurant = this.lunchRestaurants[randomIndex];
      this.updateLunchDisplay();
    }, 100);
    this.lunchInterval = interval;
    
    setTimeout(() => {
      clearInterval(interval);
      this.lunchInterval = null;
      // 最终确定一个随机商家
      const finalIndex = Math.floor(Math.random() * this.lunchRestaurants.length);
      this.lunchRestaurant = this.lunchRestaurants[finalIndex];
      this.lunchRolling = false;
      this.updateLunchDisplay();
      this.updateLunchButton();
    }, this.rollDuration);
  }

  toggleDinnerRoll() {
    if (this.dinnerRolling) return;
    if (this.dinnerRestaurants.length === 0) {
      this.showToast('附近暂无晚餐商家', 'none');
      return;
    }
    
    // 清除之前的定时器（如果有）
    if (this.dinnerInterval) {
      clearInterval(this.dinnerInterval);
      this.dinnerInterval = null;
    }
    
    this.dinnerRolling = true;
    this.updateDinnerButton();
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.dinnerRestaurants.length);
      this.dinnerRestaurant = this.dinnerRestaurants[randomIndex];
      this.updateDinnerDisplay();
    }, 100);
    this.dinnerInterval = interval;
    
    setTimeout(() => {
      clearInterval(interval);
      this.dinnerInterval = null;
      // 最终确定一个随机商家
      const finalIndex = Math.floor(Math.random() * this.dinnerRestaurants.length);
      this.dinnerRestaurant = this.dinnerRestaurants[finalIndex];
      this.dinnerRolling = false;
      this.updateDinnerDisplay();
      this.updateDinnerButton();
    }, this.rollDuration);
  }

  updateBreakfastDisplay() {
    const el = document.getElementById('breakfastFood');
    const card = document.getElementById('breakfastRestaurantCard');
    
    if (el) {
      if (this.breakfastRestaurant) {
        el.textContent = this.breakfastRestaurant.name;
        el.className = this.breakfastRolling ? 'random-food rolling' : 'random-food';
        
        // 显示商家信息卡片
        if (card) {
          card.style.display = this.breakfastRolling ? 'none' : 'block';
          if (!this.breakfastRolling) {
            this.renderRestaurantCard('breakfast', this.breakfastRestaurant);
          }
        }
      } else {
        el.textContent = this.defaultEmptyText;
        el.className = 'random-food';
        if (card) card.style.display = 'none';
      }
    }
  }

  updateLunchDisplay() {
    const el = document.getElementById('lunchFood');
    const card = document.getElementById('lunchRestaurantCard');
    
    if (el) {
      if (this.lunchRestaurant) {
        el.textContent = this.lunchRestaurant.name;
        el.className = this.lunchRolling ? 'random-food rolling' : 'random-food';
        
        // 显示商家信息卡片
        if (card) {
          card.style.display = this.lunchRolling ? 'none' : 'block';
          if (!this.lunchRolling) {
            this.renderRestaurantCard('lunch', this.lunchRestaurant);
          }
        }
      } else {
        el.textContent = this.defaultEmptyText;
        el.className = 'random-food';
        if (card) card.style.display = 'none';
      }
    }
  }

  updateDinnerDisplay() {
    const el = document.getElementById('dinnerFood');
    const card = document.getElementById('dinnerRestaurantCard');
    
    if (el) {
      if (this.dinnerRestaurant) {
        el.textContent = this.dinnerRestaurant.name;
        el.className = this.dinnerRolling ? 'random-food rolling' : 'random-food';
        
        // 显示商家信息卡片
        if (card) {
          card.style.display = this.dinnerRolling ? 'none' : 'block';
          if (!this.dinnerRolling) {
            this.renderRestaurantCard('dinner', this.dinnerRestaurant);
          }
        }
      } else {
        el.textContent = this.defaultEmptyText;
        el.className = 'random-food';
        if (card) card.style.display = 'none';
      }
    }
  }

  // 渲染商家信息卡片
  renderRestaurantCard(mealType, restaurant) {
    const prefix = mealType;
    const nameEl = document.getElementById(`${prefix}RestaurantName`);
    const distanceEl = document.getElementById(`${prefix}Distance`);
    const ratingEl = document.getElementById(`${prefix}Rating`);
    const addressEl = document.getElementById(`${prefix}Address`);
    const dishEl = document.getElementById(`${prefix}Dish`);
    const couponEl = document.getElementById(`${prefix}CouponText`);
    
    if (nameEl) nameEl.textContent = restaurant.name;
    if (distanceEl) distanceEl.textContent = `${restaurant.distance.toFixed(1)}公里`;
    if (ratingEl) ratingEl.textContent = `${restaurant.rating}分`;
    if (addressEl) addressEl.textContent = restaurant.address;
    if (dishEl) {
      const randomDish = restaurant.dishes[Math.floor(Math.random() * restaurant.dishes.length)];
      dishEl.textContent = randomDish;
    }
    if (couponEl) couponEl.textContent = restaurant.coupon;
  }

  updateBreakfastButton() {
    const btn = document.getElementById('toggleBreakfastRoll');
    if (btn) {
      btn.textContent = this.breakfastRolling ? '随机中...' : '开始随机';
      btn.disabled = this.breakfastRolling;
    }
  }

  updateLunchButton() {
    const btn = document.getElementById('toggleLunchRoll');
    if (btn) {
      btn.textContent = this.lunchRolling ? '随机中...' : '开始随机';
      btn.disabled = this.lunchRolling;
    }
  }

  updateDinnerButton() {
    const btn = document.getElementById('toggleDinnerRoll');
    if (btn) {
      btn.textContent = this.dinnerRolling ? '随机中...' : '开始随机';
      btn.disabled = this.dinnerRolling;
    }
  }

  // 一键选择三餐
  oneKeyChooseAll() {
    this.toggleBreakfastRoll();
    setTimeout(() => this.toggleLunchRoll(), 200);
    setTimeout(() => this.toggleDinnerRoll(), 400);
    this.showToast('正在为你选择三餐', 'none');
  }

  // 清空早餐选择
  clearBreakfast() {
    if (this.breakfastRolling) return;
    this.breakfastRestaurant = null;
    this.updateBreakfastDisplay();
    this.showToast('早餐已清空', 'success');
  }

  // 清空午餐选择
  clearLunch() {
    if (this.lunchRolling) return;
    this.lunchRestaurant = null;
    this.updateLunchDisplay();
    this.showToast('午餐已清空', 'success');
  }

  // 清空晚餐选择
  clearDinner() {
    if (this.dinnerRolling) return;
    this.dinnerRestaurant = null;
    this.updateDinnerDisplay();
    this.showToast('晚餐已清空', 'success');
  }

  // 一键清空三餐选择
  clearAllMeal() {
    if (this.breakfastRolling || this.lunchRolling || this.dinnerRolling) {
      this.showToast('有餐食正在随机，暂无法清空', 'none');
      return;
    }
    
    this.breakfastRestaurant = null;
    this.lunchRestaurant = null;
    this.dinnerRestaurant = null;
    this.updateBreakfastDisplay();
    this.updateLunchDisplay();
    this.updateDinnerDisplay();
    
    this.showToast('三餐已全部清空', 'success');
  }

  // 选择「全部」标签
  selectAllTags() {
    this.selectedTag = '';
    this.isAllSelected = true;
    this.filteredFoods = [...this.foods];
    this.updateTagSelection();
    this.renderFoodList();
  }

  // 标签筛选切换
  toggleTag(tag) {
    this.selectedTag = tag;
    this.isAllSelected = false;
    this.updateTagSelection();
    this.filterFoods(tag);
  }

  // 更新标签选中状态
  updateTagSelection() {
    document.querySelectorAll('.tag-item').forEach(item => {
      if (item.id === 'selectAllTags') {
        item.classList.toggle('active', this.isAllSelected);
      } else {
        const tag = item.dataset.tag;
        item.classList.toggle('active', this.selectedTag === tag);
      }
    });
  }

  // 筛选食物列表
  filterFoods(selectedTag) {
    if (!selectedTag) {
      this.filteredFoods = [...this.foods];
    } else {
      this.filteredFoods = this.foods.filter(food => {
        return food.tags.includes(selectedTag);
      });
    }
    this.renderFoodList();
  }

  // 切换三餐分类
  toggleMealType(type) {
    if (this.selectedMealType === type) {
      this.selectedMealType = '';
    } else {
      this.selectedMealType = type;
    }
    this.updateMealTypeSelection();
  }

  // 更新三餐分类选中状态
  updateMealTypeSelection() {
    document.querySelectorAll('.meal-type-item').forEach(item => {
      item.classList.toggle('active', item.dataset.type === this.selectedMealType);
    });
  }

  // 显示添加弹窗
  showAddModal() {
    this.showModal = true;
    this.isEditMode = false;
    this.inputFoodName = '';
    this.checkedTags = [];
    this.selectedMealType = '';
    this.customTagInput = '';
    this.updateModalDisplay();
    this.updateTagCheckboxes();
  }

  // 显示编辑弹窗
  showEditModal(food) {
    this.showModal = true;
    this.isEditMode = true;
    this.editFoodId = food.id;
    this.inputFoodName = food.name;
    this.checkedTags = [...food.tags];
    this.selectedMealType = food.mealType;
    this.customTagInput = '';
    this.updateModalDisplay();
    this.updateTagCheckboxes();
    this.updateMealTypeSelection();
    
    const input = document.getElementById('inputFoodName');
    if (input) input.value = food.name;
  }

  // 更新弹窗显示
  updateModalDisplay() {
    const mask = document.getElementById('modalMask');
    const content = document.getElementById('modalContent');
    const title = document.getElementById('modalTitle');
    const submit = document.getElementById('modalSubmit');
    
    if (mask) mask.style.display = this.showModal ? 'block' : 'none';
    if (content) content.style.display = this.showModal ? 'block' : 'none';
    if (title) title.textContent = this.isEditMode ? '修改食物' : '添加新食物';
    if (submit) submit.textContent = this.isEditMode ? '确认修改' : '确认添加';
  }

  // 隐藏弹窗
  hideModal() {
    this.showModal = false;
    this.isEditMode = false;
    this.editFoodId = '';
    this.inputFoodName = '';
    this.checkedTags = [];
    this.selectedMealType = '';
    this.customTagInput = '';
    this.updateModalDisplay();
    
    const input = document.getElementById('inputFoodName');
    const customInput = document.getElementById('customTagInput');
    if (input) input.value = '';
    if (customInput) customInput.value = '';
  }

  // 输入食物名称
  inputFoodName(e) {
    this.inputFoodName = e.target.value;
  }

  // 添加自定义标签
  addCustomTag() {
    const tag = this.customTagInput;
    if (!tag) {
      this.showToast('标签名称不能为空', 'none');
      return;
    }
    if (this.tags.includes(tag)) {
      this.showToast('该标签已存在', 'none');
      if (!this.checkedTags.includes(tag)) {
        this.checkedTags.push(tag);
        this.updateTagCheckboxes();
      }
      const input = document.getElementById('customTagInput');
      if (input) input.value = '';
      this.customTagInput = '';
      return;
    }
    this.tags.push(tag);
    this.checkedTags.push(tag);
    this.customTagInput = '';
    const input = document.getElementById('customTagInput');
    if (input) input.value = '';
    const addBtn = document.getElementById('addCustomTagBtn');
    if (addBtn) addBtn.style.display = 'none';
    this.renderTags();
    this.updateTagCheckboxes();
    this.saveToLocalStorage();
    this.showToast('标签添加成功', 'success');
  }

  // 弹窗内删除标签
  deleteTagInModal(tag) {
    this.showTagDeleteModal = true;
    this.deleteTag = tag;
    this.updateTagDeleteModal();
  }

  // 更新标签删除弹窗
  updateTagDeleteModal() {
    const mask = document.getElementById('tagDeleteModalMask');
    const modal = document.getElementById('tagDeleteModal');
    if (mask) mask.style.display = this.showTagDeleteModal ? 'block' : 'none';
    if (modal) modal.style.display = this.showTagDeleteModal ? 'block' : 'none';
  }

  // 隐藏标签删除确认弹窗
  hideTagDeleteConfirm() {
    this.showTagDeleteModal = false;
    this.deleteTag = '';
    this.updateTagDeleteModal();
  }

  // 确认删除标签
  confirmDeleteTag() {
    const tag = this.deleteTag;
    if (!tag) return;
    
    this.tags = this.tags.filter(t => t !== tag);
    if (this.selectedTag === tag) {
      this.selectedTag = '';
      this.isAllSelected = true;
    }
    this.foods = this.foods.map(food => {
      return {
        ...food,
        tags: food.tags.filter(t => t !== tag)
      };
    });
    this.checkedTags = this.checkedTags.filter(t => t !== tag);
    
    this.filteredFoods = this.isAllSelected ? [...this.foods] : this.foods.filter(food => {
      return food.tags.includes(this.selectedTag);
    });
    
    this.renderTags();
    this.renderFoodList();
    this.updateTagSelection();
    this.updateTagCheckboxes();
    this.saveToLocalStorage();
    this.hideTagDeleteConfirm();
    this.showToast('标签删除成功', 'success');
  }

  // 选择智能推荐
  chooseRecommend(name) {
    this.inputFoodName = name;
    const input = document.getElementById('inputFoodName');
    if (input) input.value = name;
  }

  // 添加新食物
  addFood() {
    if (!this.inputFoodName) {
      this.showToast('请输入食物名称', 'none');
      return;
    }
    if (!this.selectedMealType) {
      this.showToast('请选择三餐分类', 'none');
      return;
    }
    
    const newFood = {
      id: this.foods.length > 0 ? Math.max(...this.foods.map(f => f.id)) + 1 : 1,
      name: this.inputFoodName,
      lastEatDate: new Date().toISOString().split('T')[0],
      mealType: this.selectedMealType,
      tags: [...this.checkedTags]
    };
    
    this.foods.push(newFood);
    this.filteredFoods = this.isAllSelected ? [...this.foods] : this.foods.filter(food => {
      return food.tags.includes(this.selectedTag);
    });
    
    this.updateRandomFoodList(newFood.mealType, newFood.name, 'add');
    this.renderFoodList();
    this.saveToLocalStorage();
    this.hideModal();
    this.showToast('添加成功', 'success');
  }

  // 修改食物
  updateFood() {
    if (!this.inputFoodName) {
      this.showToast('请输入食物名称', 'none');
      return;
    }
    if (!this.selectedMealType) {
      this.showToast('请选择三餐分类', 'none');
      return;
    }
    
    const index = this.foods.findIndex(item => item.id === this.editFoodId);
    if (index === -1) {
      this.showToast('食物不存在', 'none');
      return;
    }
    
    const oldMealType = this.foods[index].mealType;
    const oldName = this.foods[index].name;
    
    this.foods[index] = {
      ...this.foods[index],
      name: this.inputFoodName,
      mealType: this.selectedMealType,
      tags: [...this.checkedTags]
    };
    
    this.filteredFoods = this.isAllSelected ? [...this.foods] : this.foods.filter(food => {
      return food.tags.includes(this.selectedTag);
    });
    
    if (oldMealType !== this.selectedMealType) {
      this.updateRandomFoodList(oldMealType, oldName, 'remove');
      this.updateRandomFoodList(this.selectedMealType, this.inputFoodName, 'add');
    } else {
      this.updateRandomFoodList(oldMealType, oldName, 'update', this.inputFoodName);
    }
    
    this.renderFoodList();
    this.saveToLocalStorage();
    this.hideModal();
    this.showToast('修改成功', 'success');
  }

  // 显示删除确认弹窗
  showDeleteConfirm(id) {
    this.showDeleteModal = true;
    this.deleteFoodId = id;
    this.updateDeleteModal();
  }

  // 更新删除弹窗
  updateDeleteModal() {
    const mask = document.getElementById('deleteModalMask');
    const modal = document.getElementById('deleteModal');
    if (mask) mask.style.display = this.showDeleteModal ? 'block' : 'none';
    if (modal) modal.style.display = this.showDeleteModal ? 'block' : 'none';
  }

  // 隐藏删除确认弹窗
  hideDeleteConfirm() {
    this.showDeleteModal = false;
    this.deleteFoodId = '';
    this.updateDeleteModal();
  }

  // 确认删除
  confirmDelete() {
    const index = this.foods.findIndex(item => item.id === this.deleteFoodId);
    if (index === -1) {
      this.showToast('食物不存在', 'none');
      this.hideDeleteConfirm();
      return;
    }
    
    const deletedFood = this.foods[index];
    this.foods.splice(index, 1);
    this.filteredFoods = this.isAllSelected ? [...this.foods] : this.foods.filter(food => {
      return food.tags.includes(this.selectedTag);
    });

    this.updateRandomFoodList(deletedFood.mealType, deletedFood.name, 'remove');
    this.renderFoodList();
    this.saveToLocalStorage();
    this.hideDeleteConfirm();
    this.showToast('删除成功', 'success');
  }

  // 工具方法：更新随机食物列表
  updateRandomFoodList(mealType, foodName, action, newName = '') {
    let listKey = '';
    switch (mealType) {
      case '早餐':
        listKey = 'breakfastFoodList';
        break;
      case '午餐':
        listKey = 'lunchFoodList';
        break;
      case '晚餐':
        listKey = 'dinnerFoodList';
        break;
      default:
        return;
    }
    
    const list = this[listKey];
    const index = list.indexOf(foodName);
    
    if (action === 'add' && index === -1) {
      list.push(foodName);
    } else if (action === 'remove' && index !== -1) {
      list.splice(index, 1);
    } else if (action === 'update' && index !== -1) {
      list[index] = newName;
    }
    
    this[listKey] = list;
  }

  // 渲染食物列表
  renderFoodList() {
    const container = document.getElementById('foodList');
    if (!container) return;
    
    if (this.filteredFoods.length === 0) {
      container.innerHTML = '<div style="text-align: center; padding: 40px; color: #8cb4e0;">暂无食物</div>';
      return;
    }
    
    container.innerHTML = this.filteredFoods.map(food => `
      <div class="food-card">
        <div class="food-info">
          <div class="food-header">
            <div class="food-name">${food.name}</div>
            <div class="food-meal-tag">${food.mealType}</div>
          </div>
          <div class="food-date">上次食用：${food.lastEatDate}</div>
          <div class="food-tags">
            ${food.tags.map(tag => `<span class="tag-chip">${tag}</span>`).join('')}
          </div>
          <div class="food-actions">
            <button class="edit-btn" data-food-id="${food.id}">编辑</button>
            <button class="delete-btn" data-food-id="${food.id}">删除</button>
          </div>
        </div>
      </div>
    `).join('');
    
    // 绑定编辑和删除按钮事件
    container.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const foodId = parseInt(e.target.dataset.foodId);
        const food = this.foods.find(f => f.id === foodId);
        if (food) {
          this.showEditModal(food);
        }
      });
    });
    
    container.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const foodId = parseInt(e.target.dataset.foodId);
        this.showDeleteConfirm(foodId);
      });
    });
  }

  // 渲染标签列表
  renderTags() {
    const container = document.querySelector('.tag-scroll-wrap');
    if (!container) return;
    
    const allTagHtml = '<div class="tag-item active" id="selectAllTags"><span class="tag-text">全部</span></div>';
    const tagsHtml = this.tags.map(tag => `
      <div class="tag-item ${this.selectedTag === tag ? 'active' : ''}" data-tag="${tag}">
        <span class="tag-text">${tag}</span>
      </div>
    `).join('');
    
    container.innerHTML = allTagHtml + tagsHtml;
    
    // 重新绑定事件
    document.getElementById('selectAllTags')?.addEventListener('click', () => this.selectAllTags());
    container.querySelectorAll('.tag-item[data-tag]').forEach(item => {
      item.addEventListener('click', (e) => {
        const tag = e.currentTarget.dataset.tag;
        this.toggleTag(tag);
      });
    });
  }

  // 渲染推荐列表
  renderRecommendList() {
    const container = document.getElementById('recommendList');
    if (!container) return;
    
    container.innerHTML = this.recommendFoods.map(food => `
      <div class="recommend-item" onclick="app.chooseRecommend('${food}')">${food}</div>
    `).join('');
  }

  // 更新标签复选框
  updateTagCheckboxes() {
    const container = document.getElementById('tagCheckWrap');
    if (!container) return;
    
    container.innerHTML = this.tags.map(tag => `
      <div class="tag-check-item">
        <input type="checkbox" value="${tag}" ${this.checkedTags.includes(tag) ? 'checked' : ''} 
               onchange="app.toggleTagCheckbox('${tag}', this.checked)">
        <span>${tag}</span>
        <span class="tag-check-delete" onclick="app.deleteTagInModal('${tag}')">✕</span>
      </div>
    `).join('');
  }

  // 切换标签复选框
  toggleTagCheckbox(tag, checked) {
    if (checked) {
      if (!this.checkedTags.includes(tag)) {
        this.checkedTags.push(tag);
      }
    } else {
      this.checkedTags = this.checkedTags.filter(t => t !== tag);
    }
  }

  // 清理所有定时器
  clearAllIntervals() {
    if (this.breakfastInterval) {
      clearInterval(this.breakfastInterval);
      this.breakfastInterval = null;
      this.breakfastRolling = false;
      this.updateBreakfastDisplay();
      this.updateBreakfastButton();
    }
    if (this.lunchInterval) {
      clearInterval(this.lunchInterval);
      this.lunchInterval = null;
      this.lunchRolling = false;
      this.updateLunchDisplay();
      this.updateLunchButton();
    }
    if (this.dinnerInterval) {
      clearInterval(this.dinnerInterval);
      this.dinnerInterval = null;
      this.dinnerRolling = false;
      this.updateDinnerDisplay();
      this.updateDinnerButton();
    }
  }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new MealApp();
  
  // 页面卸载时清理定时器
  window.addEventListener('beforeunload', () => {
    if (app) {
      app.clearAllIntervals();
    }
  });
});
